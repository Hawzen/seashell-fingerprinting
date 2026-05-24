import { LeftPanel } from "./LeftPanel";
import { MapPanel } from "./MapPanel";
import { LoadingOverlay, MissingData } from "./Overlays";
import { RightPanel } from "./RightPanel";
import { TopBar } from "./TopBar";

export function AppShell() {
  return (
    <>
      <TopBar />

      <main class="workspace">
        <LeftPanel />
        <MapPanel />
        <RightPanel />
      </main>

      <LoadingOverlay />
      <MissingData />
    </>
  );
}
