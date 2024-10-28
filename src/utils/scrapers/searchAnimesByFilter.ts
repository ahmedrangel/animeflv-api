import { $fetch } from "ofetch";
import { AnimeflvUrls } from "../../constants";
import type { FilterOptions, SearchAnimeResults } from "../../types";
import { executeSearch } from "../../utils/scrapers/helpers/executeSearch";

const generateRequestUrl = (options?: FilterOptions): string => {
  if (!options) return AnimeflvUrls.host + "/browse?order=default";

  const reqURL = new URL(AnimeflvUrls.host + "/browse");

  const genrePrefix = "genre[]";
  const typePrefix = "type[]";
  const statusPrefix = "status[]";
  const orderPrefix = "order";
  const pagePrefix = "page";

  if (options.genres && Array.isArray(options.genres)) {
    for (const genre of options.genres) {
      reqURL.searchParams.append(genrePrefix, genre);
    }
  }

  if (options.statuses && Array.isArray(options.statuses)) {
    for (const status of options.statuses) {
      reqURL.searchParams.append(statusPrefix, status);
    }
  }

  if (options.types && Array.isArray(options.types)) {
    for (const type of options.types) {
      reqURL.searchParams.append(typePrefix, type);
    }
  }

  if (options.order) {
    reqURL.searchParams.append(orderPrefix, options.order);
  }
  else {
    reqURL.searchParams.append(orderPrefix, "default");
  }

  if (options.page) {
    reqURL.searchParams.append(pagePrefix, String(options.page));
  }

  return reqURL.toString();
};

export const searchAnimesByFilter = async (opts?: FilterOptions): Promise<SearchAnimeResults | null> => {
  try {
    /** La url del request con los filtros ya puestos */
    const formatedUrl = generateRequestUrl(opts);

    const filterData = await $fetch(formatedUrl).catch(() => null);

    return executeSearch(filterData, opts);
  }
  catch {
    return null;
  }
};