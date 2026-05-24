// @ts-nocheck

import { centerViewportOnShell, shellById } from './conservation-controls';
import { projectFingerprintToPca, shellprintFromFingerprint } from './data-pack';
import { speciesColor } from './map-scatter';
import { els, state } from './runtime';
import { selectShell } from './selection-palette';
import { contourFromUploadMask, projectTraitsToPca, traitsFromUpload } from './upload-mask';
import { fingerprintUploadWithPython } from './upload-python';
import { deriveMorphMetrics } from './utils';

export async function handleUploadShell() {
  const file = els.uploadInput.files?.[0];
  if (!file) return;
  try {
    const py = await fingerprintUploadWithPython(file);
    const geometry = contourFromUploadMask(py.mask, py.imageData.width, py.imageData.height, state.contourPoints || 256);
    geometry.contour = py.contour;
    const traits = traitsFromUpload(py.imageData, py.mask, geometry);
    const shell = {
      id: -Date.now(),
      file: file.name,
      name: `Uploaded shell ${file.name}`,
      species: "Uploaded shell",
      specimen: "",
      specimen_label: "Bring your own shell",
      view: "",
      view_label: "Uploaded image",
      component_count: 1,
      contour_pc: projectFingerprintToPca(py.fingerprint),
      upload_contour: geometry.contour,
      fingerprint: py.fingerprint,
      ...traits,
    };
    shell.trait_pc = projectTraitsToPca(shell);
    shell.morph_traits = deriveMorphMetrics(shell);
    shell.fingerprint_hash = await shellprintFromFingerprint(py.fingerprint);
    shell.species_sample_count = 1;
    shell.global_occurrences = 0;
    shell.rarity_label = "Data deficient";
    shell.rarity_reason = "uploaded image";
    shell.location_label = "Uploaded image";
    shell.location_key = "uploaded";
    shell.location_color = speciesColor("uploaded");
    shell.species_color = speciesColor(shell.species);
    if (state.uploadImageUrl) URL.revokeObjectURL(state.uploadImageUrl);
    state.uploadImageUrl = py.imageUrl || URL.createObjectURL(file);
    state.shells = [shell, ...state.shells.filter((item) => item.id >= 0)];
    state.filtered = [shell, ...state.filtered.filter((item) => item.id >= 0)];
    state.shellById.set(shell.id, shell);
    centerViewportOnShell(shell);
    selectShell(shell);
    els.statusLine.textContent = "Uploaded shell projected";
  } catch (error) {
    els.statusLine.textContent = error.message || "Upload failed";
  } finally {
    els.uploadInput.value = "";
  }
}
