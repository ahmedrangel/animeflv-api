import { load } from "cheerio";
import type { FilterOptions, SearchAnimeResults } from "../../../types";
import { getNextAndPrevPages } from "./getPrevAndNextPages";
import { scrapSearchAnimeData } from "./scrapAnimeData";
import { getQuery } from "ufo";

export const executeSearch = (searchData: string): SearchAnimeResults | null => {
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
  const pageFromQuery = Number(getQuery(nextPage || previousPage)?.page);
  const isNextPage = nextPage && pageFromQuery;
  const isPreviousPage = previousPage && pageFromQuery;
  const inferredPage = isNextPage ? pageFromQuery - 1 : isPreviousPage ? pageFromQuery + 1 : null;
  search.currentPage = inferredPage || 1;
  search.hasNextPage = nextPage ? true : false;

  return search;
};