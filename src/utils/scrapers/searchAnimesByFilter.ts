import { $fetch } from "ofetch";
import { AnimeflvUrls } from "../../constants";
import type { FilterOptions, SearchAnimeResults } from "../../types";
import { executeSearch } from "../../utils/scrapers/helpers/executeSearch";

export const searchAnimesByFilter = async (opts?: FilterOptions): Promise<SearchAnimeResults | null> => {
  try {
    const filterData = await $fetch(`${AnimeflvUrls.host}/browse`, {
      params: {
        ...opts.genres && Array.isArray(opts.genres) ? { "genre[]": opts.genres } : {},
        ...opts.statuses && Array.isArray(opts.statuses) ? { "status[]": opts.statuses } : {},
        ...opts.types && Array.isArray(opts.types) ? { "type[]": opts.types } : {},
        ...opts.order ? { order: opts.order } : { order: "default" },
        ...opts.page ? { page: opts.page } : {}
      }
    }).catch(() => null);

    return executeSearch(filterData);
  }
  catch {
    return null;
  }
};