import { $fetch } from "ofetch";
import type { SearchAnimeResults } from "../../types";
import { executeSearch } from "../../utils/scrapers/helpers/executeSearch";
import { AnimeflvUrls } from "../../constants";

export const searchAnime = async (opts: Record<string, string>): Promise<SearchAnimeResults | null> => {
  const { query } = opts;
  const fixedQuery = query.toLowerCase().replace(/\s+/g, "+");
  const reqURL = new URL(`${AnimeflvUrls.host}/browse?q=${fixedQuery}`);
  if (opts?.page) reqURL.searchParams.append("page", opts.page);

  try {
    const searchData = await $fetch(reqURL).catch(() => null);
    if (!searchData) return null;

    return executeSearch(searchData, opts);
  }
  catch {
    return null;
  }
};