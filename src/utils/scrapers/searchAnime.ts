import { $fetch } from "ofetch";
import type { SearchAnimeResults } from "../../types";
import { executeSearch } from "../../utils/scrapers/helpers/executeSearch";
import { AnimeflvUrls } from "../../constants";

export const searchAnime = async (query: string): Promise<SearchAnimeResults | null> => {
  try {
    const searchData = await $fetch(AnimeflvUrls.host + "/browse?q=" + query.toLowerCase().replace(/\s+/g, "+")).catch(() => null);
    if (!searchData) return null;

    return executeSearch(searchData);
  }
  catch {
    return null;
  }
};