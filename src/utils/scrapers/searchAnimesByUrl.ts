import { $fetch } from "ofetch";
import { type SearchAnimeResults } from "../../types";
import { executeSearch } from "../../utils/scrapers/helpers/executeSearch";

export const searchAnimesBySpecificURL = async (url: string): Promise<SearchAnimeResults | null> => {
  if (!url || (typeof url) !== "string")
    throw new TypeError(`Parámetro url debe ser una string no vacía, pasaste: ${url}`, { cause: "url is not a valid url." });

  try {
    const specificData = await $fetch(url).catch(() => null);
    return executeSearch(specificData);
  }
  catch {
    return null;
  }
};