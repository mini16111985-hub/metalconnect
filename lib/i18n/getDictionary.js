import { defaultLocale } from "./config";
import { en } from "./dictionaries/en";
import { hr } from "./dictionaries/hr";
import { de } from "./dictionaries/de";
import { it } from "./dictionaries/it";

const dictionaries = {
  en,
  hr,
  de,
  it,
};

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}