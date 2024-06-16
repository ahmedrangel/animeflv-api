import type { Cheerio, Element } from "cheerio";
import { AnimeflvUrls } from "../constants";

export function getNextAndPrevPages(selector: Cheerio<Element>): {
    foundPages: number
    previousPage: string | null
    nextPage: string | null
} {
  const aTagValue = selector.last().prev().find("a").text();
  const aRef = selector.eq(0).children("a").attr("href");

  let foundPages = 0;
  let previousPage: string | null = "";
  let nextPage: string | null = "";

  if (Number(aTagValue) === 0) foundPages = 1;
  else foundPages = Number(aTagValue);

  if (aRef === "#" || foundPages == 1) previousPage = null;
  else previousPage = AnimeflvUrls.host + aRef;

  if (selector.last().children("a").attr("href") === "#" || foundPages == 1) nextPage = null;
  else nextPage = AnimeflvUrls.host + selector.last().children("a").attr("href");

  return { foundPages, nextPage, previousPage };

}