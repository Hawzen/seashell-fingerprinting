// @ts-nocheck

const countryNames = typeof Intl !== "undefined" && Intl.DisplayNames
  ? new Intl.DisplayNames(["en"], { type: "region" })
  : null;

export function countryName(code) {
  const normalized = String(code || "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized) || normalized === "ZZ") return "";
  return countryNames?.of(normalized) || normalized;
}

export function countryFlag(code) {
  const normalized = String(code || "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized) || normalized === "ZZ") return "";
  return [...normalized]
    .map((letter) => String.fromCodePoint(0x1f1e6 + letter.charCodeAt(0) - 65))
    .join("");
}

export function parseCountryList(value) {
  return String(value || "")
    .split(";")
    .map((item) => {
      const [code, count] = item.trim().split(":");
      const normalized = String(code || "").trim().toUpperCase();
      return {
        code: normalized,
        count: Number(count || 0),
        name: countryName(normalized),
        flag: countryFlag(normalized),
      };
    })
    .filter((item) => item.code && item.name && Number.isFinite(item.count) && item.count > 0);
}

export function countrySearchText(code) {
  const normalized = String(code || "").trim().toUpperCase();
  return `${countryName(normalized)} ${normalized}`.trim().toLowerCase();
}

export function countryDisplayLabel(code) {
  const name = countryName(code);
  if (!name) return "";
  const flag = countryFlag(code);
  return flag ? `${flag} ${name}` : name;
}

export function formatTopCountries(value) {
  const items = parseCountryList(value);
  if (!items.length) return "";
  return items.map((item) => item.flag).filter(Boolean).join(" ");
}
