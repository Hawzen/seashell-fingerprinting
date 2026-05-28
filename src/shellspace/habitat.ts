// @ts-nocheck

export const habitatDefs = [
  {
    key: "marine",
    label: "Marine",
    aphiaKey: "aphia_is_marine",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 14.2c2.3-2 4.6-2 6.9 0 2.3 2 4.6 2 6.9 0 1-.8 2-1.3 3.2-1.5"/><path d="M3.5 18.4c2.3-2 4.6-2 6.9 0 2.3 2 4.6 2 6.9 0 1-.8 2-1.3 3.2-1.5"/></svg>',
  },
  {
    key: "brackish",
    label: "Brackish",
    aphiaKey: "aphia_is_brackish",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c3.5 4.2 5.2 7.4 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2.6 1.7-5.8 5.2-10Z"/><path d="M8.4 15.4c2.4-1.5 4.8-1.5 7.2 0"/></svg>',
  },
  {
    key: "freshwater",
    label: "Freshwater",
    aphiaKey: "aphia_is_fresh",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c3.9 4.6 5.8 8 5.8 10.6a5.8 5.8 0 1 1-11.6 0C6.2 11.5 8.1 8.1 12 3.5Z"/></svg>',
  },
  {
    key: "terrestrial",
    label: "Terrestrial",
    aphiaKey: "aphia_is_terrestrial",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13.8c6.4-8.4 12.4-8.2 14-8.1.1 1.6.2 7.6-8.2 14-2.9-2.9-3-3-5.8-5.9Z"/><path d="M7.9 16.8 16.5 8.2"/></svg>',
  },
];

export function aphiaFlag(value) {
  const text = String(value ?? "").trim().toLowerCase();
  return value === true || value === 1 || text === "1" || text === "true" || text === "yes";
}

export function shellHabitatKeys(shell) {
  const enrichment = shell?.enrichment || shell || {};
  return habitatDefs
    .filter((def) => aphiaFlag(enrichment[def.aphiaKey]))
    .map((def) => def.key);
}
