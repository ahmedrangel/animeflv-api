import { type CheerioAPI } from "cheerio";
import type { AnimeType, PartialAnimeData } from "../types";
import { AnimeflvUrls } from "../constants";

export function scrapSearchAnimeData($: CheerioAPI): PartialAnimeData[] {
  const selectedElement = $("body > div.Wrapper > div > div > main > ul > li");

  if (selectedElement.length > 0) {
    const data: PartialAnimeData[] = [];

    selectedElement.each((i, el) => {
      data.push({
        title: $(el).find("h3").text(),
        cover: $(el).find("figure > img").attr("src")!,
        synopsis: $(el).find("div.Description > p").eq(1).text(),
        rating: $(el).find("article > div > p:nth-child(2) > span.Vts.fa-star").text(),
        slug: $(el).find("a").attr("href")!.replace("/anime/", ""),
        type: $(el).find("a > div > span.Type").text() as AnimeType,
        url: AnimeflvUrls.host + ($(el).find("a").attr("href") as string),
      });
    });

    return data;

  }
  else {
    return [];
  }
}