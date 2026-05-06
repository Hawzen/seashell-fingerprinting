{-# LANGUAGE ForeignFunctionInterface #-}

module Main where

import Control.Monad (foldM, forM_)
import Foreign.C.Types (CDouble (..), CInt (..))
import Foreign.Marshal.Array (peekArray)
import Foreign.Ptr (Ptr, plusPtr)
import Foreign.Storable (peek, poke, sizeOf)

main :: IO ()
main = pure ()

doubleAt :: Ptr CDouble -> Int -> Ptr CDouble
doubleAt ptr index = ptr `plusPtr` (index * sizeOf (undefined :: CDouble))

peekD :: Ptr CDouble -> Int -> IO Double
peekD ptr index = do
  CDouble value <- peek (doubleAt ptr index)
  pure value

pokeD :: Ptr CDouble -> Int -> Double -> IO ()
pokeD ptr index value = poke (doubleAt ptr index) (CDouble value)

foreign export ccall normalizeFingerprint ::
  Ptr CDouble -> CInt -> IO CDouble

normalizeFingerprint :: Ptr CDouble -> CInt -> IO CDouble
normalizeFingerprint ptr rawCount = do
  let count = fromIntegral rawCount
  values <- peekArray count ptr
  let total = sum [value | CDouble value <- values]
      meanValue = if count > 0 then total / fromIntegral count else 0
  if meanValue <= 0
    then pure (CDouble 0)
    else do
      forM_ [0 .. count - 1] $ \index -> do
        value <- peekD ptr index
        pokeD ptr index (value / meanValue)
      pure (CDouble meanValue)

foreign export ccall reconstructFingerprint ::
  Ptr CDouble ->
  Ptr CDouble ->
  Ptr CDouble ->
  CInt ->
  CInt ->
  Ptr CDouble ->
  IO ()

reconstructFingerprint ::
  Ptr CDouble ->
  Ptr CDouble ->
  Ptr CDouble ->
  CInt ->
  CInt ->
  Ptr CDouble ->
  IO ()
reconstructFingerprint meanPtr componentPtr coordPtr rawAngleCount rawComponentCount outPtr = do
  let angleCount = fromIntegral rawAngleCount
      componentCount = fromIntegral rawComponentCount
  forM_ [0 .. angleCount - 1] $ \angle -> do
    base <- peekD meanPtr angle
    weighted <-
      foldl
        ( \acc componentIndex -> do
            subtotal <- acc
            coord <- peekD coordPtr componentIndex
            component <-
              peekD componentPtr (componentIndex * angleCount + angle)
            pure (subtotal + coord * component)
        )
        (pure base)
        [0 .. componentCount - 1]
    pokeD outPtr angle (max 0.02 weighted)
  _ <- normalizeFingerprint outPtr rawAngleCount
  pure ()

foreign export ccall fingerprintDistance ::
  Ptr CDouble -> Ptr CDouble -> CInt -> IO CDouble

fingerprintDistance :: Ptr CDouble -> Ptr CDouble -> CInt -> IO CDouble
fingerprintDistance leftPtr rightPtr rawCount = do
  let count = fromIntegral rawCount
  total <-
    foldl
      ( \acc index -> do
          subtotal <- acc
          left <- peekD leftPtr index
          right <- peekD rightPtr index
          let delta = left - right
          pure (subtotal + delta * delta)
      )
      (pure 0)
      [0 .. count - 1]
  pure . CDouble . sqrt $ total / max 1 (fromIntegral count)

foreign export ccall contourDistance ::
  Ptr CDouble -> Ptr CDouble -> CInt -> IO CDouble

contourDistance :: Ptr CDouble -> Ptr CDouble -> CInt -> IO CDouble
contourDistance leftPtr rightPtr rawPointCount = do
  let pointCount = fromIntegral rawPointCount
  (directTotal, reverseTotal) <-
    foldM
      ( \(directSubtotal, reverseSubtotal) pointIndex -> do
          let directIndex = pointIndex * 2
              reverseIndex = ((pointCount - pointIndex) `mod` pointCount) * 2
          leftX <- peekD leftPtr directIndex
          leftY <- peekD leftPtr (directIndex + 1)
          rightX <- peekD rightPtr directIndex
          rightY <- peekD rightPtr (directIndex + 1)
          reverseX <- peekD leftPtr reverseIndex
          reverseY <- peekD leftPtr (reverseIndex + 1)
          let directDx = leftX - rightX
              directDy = leftY - rightY
              reverseDx = reverseX - rightX
              reverseDy = reverseY - rightY
          pure
            ( directSubtotal + directDx * directDx + directDy * directDy
            , reverseSubtotal + reverseDx * reverseDx + reverseDy * reverseDy
            )
      )
      (0, 0)
      [0 .. pointCount - 1]
  pure . CDouble . sqrt $ min directTotal reverseTotal / max 1 (fromIntegral pointCount)
