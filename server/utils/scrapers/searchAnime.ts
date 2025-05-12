import { $fetch } from "ofetch";

export const searchAnime = async (opts: { query: string, page?: number }): Promise<SearchAnimeResults | null> => {
  const { query } = opts;
  const fixedQuery = query.toLowerCase().replace(/\s+/g, "+");
  try {
    const searchData = await $fetch(`${AnimeflvUrls.host}/browse`, {
      query: {
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
