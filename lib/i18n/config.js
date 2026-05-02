export const locales = ["en", "hr", "de", "it"];
export const defaultLocale = "en";

export function isValidLocale(locale) {
  return locales.includes(locale);
}