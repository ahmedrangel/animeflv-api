import { $fetch } from "ofetch";
import { AnimeflvUrls } from "../../constants";
import type { FilterOptions, SearchAnimeResults } from "../../types";
import { executeSearch } from "../../utils/scrapers/helpers/executeSearch";

const generateRequestUrl = (options?: FilterOptions): string => {
  if (!options) return AnimeflvUrls.host + "/browse?order=default";

  const FinalUrl = new URL(AnimeflvUrls.host + "/browse");

  const genrePrefix = "genre[]";
  const typePrefix = "type[]";
  const statusPrefix = "status[]";
  const orderPrefix = "order";

  if (options.genres && Array.isArray(options.genres)) {
    for (const genre of options.genres) {
      FinalUrl.searchParams.append(genrePrefix, genre);
    }
  }

  if (options.statuses && Array.isArray(options.statuses)) {
    for (const status of options.statuses) {
      FinalUrl.searchParams.append(statusPrefix, status);
    }
  }

  if (options.types && Array.isArray(options.types)) {
    for (const type of options.types) {
      FinalUrl.searchParams.append(typePrefix, type);
    }
  }

  if (options.order) {
    FinalUrl.searchParams.append(orderPrefix, options.order);
  }
  else {
    FinalUrl.searchParams.append(orderPrefix, "default");
  }

  return FinalUrl.toString();
};

export const searchAnimesByFilter = async (opts?: FilterOptions): Promise<SearchAnimeResults | null> => {
  try {
    /** La url del request con los filtros ya puestos */
    const formatedUrl = generateRequestUrl(opts);

    const filterData = await $fetch(formatedUrl).catch(() => null);

    return executeSearch(filterData);
  }
  catch {
    return null;
  }
};