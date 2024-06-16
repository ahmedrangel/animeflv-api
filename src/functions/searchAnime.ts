import { $fetch } from "ofetch";
import type { SearchAnimeResults } from "../types";
import { executeSearch } from "../utils";
import { AnimeflvUrls } from "../constants";

export const searchAnime = async (query: string): Promise<SearchAnimeResults | null> => {
  if (!query || (typeof query) !== "string")
    throw new TypeError(`El parámetro query debe ser una string no vacía, pasaste: ${query}`, { cause: `query: ${query}` });

  try {
    const searchData = await $fetch(AnimeflvUrls.host + "/browse?q=" + query.toLowerCase().replace(/\s+/g, "+")).catch(() => null);
    if (!searchData) return null;

    return executeSearch(searchData);
  }
  catch {
    return null;
  }
};