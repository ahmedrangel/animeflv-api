import { $fetch } from "ofetch";
import { executeSearch } from "../../utils/scrapers/helpers/executeSearch";
import { AnimeflvUrls } from "../../constants";
import type { SearchAnimeResults } from "../../types";

export const searchAnime = async (opts: { query: string, page?: number }): Promise<SearchAnimeResults | null> => {
  const { query } = opts;
  const fixedQuery = query.toLowerCase().replace(/\s+/g, "+");
  try {
    const searchData = await $fetch(`${AnimeflvUrls.host}/browse`, {
      params: {
        q: fixedQuery,
        ...opts?.page ? { page: opts.page } : {}
      }
    }).catch(() => null);
    if (!searchData) return null;

    return executeSearch(searchData);
  }
  catch {
    return null;
  }
};