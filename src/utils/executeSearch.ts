import { type SearchAnimeResults } from "../types";
import { load } from "cheerio";
import { getNextAndPrevPages } from "./getPrevAndNextPages";
import { scrapSearchAnimeData } from "./scrapAnimeData";

export function executeSearch (searchData: string): SearchAnimeResults | null {

  const $ = load(searchData);

  const search: SearchAnimeResults = {
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

  return search;
}