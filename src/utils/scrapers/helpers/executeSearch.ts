import { load } from "cheerio";
import type { SearchAnimeResults, FilterOptions } from "../../../types";
import { getNextAndPrevPages } from "./getPrevAndNextPages";
import { scrapSearchAnimeData } from "./scrapAnimeData";

export const executeSearch = (searchData: string, opts?: FilterOptions): SearchAnimeResults | null => {
  const $ = load(searchData);

  const search: SearchAnimeResults = {
    currentPage: 1,
    hasNextPage: false,
    previousPage: null,
    nextPage: null,
    foundPages: 0,
    media: []
  };

  const pageSelector = $("body > div.Wrapper > div > div > main > div > ul > li");
  const { foundPages, nextPage, previousPage } = getNextAndPrevPages(pageSelector);
  search.media = scrapSearchAnimeData($);
  search.foundPages = foundPages;
  search.nextPage = nextPage;
  search.previousPage = previousPage;
  if (opts?.page) search.currentPage = opts.page || 1;
  search.hasNextPage = nextPage ? true : false;

  return search;
};