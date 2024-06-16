import { load } from "cheerio";
import { AnimeflvUrls } from "../constants";
import type { ChapterData } from "../types";
import { $fetch } from "ofetch";

export const getLatest = async (): Promise<ChapterData[]> => {
  try {
    const chaptersData = await $fetch(AnimeflvUrls.host).catch(() => null);
    const $ = load(chaptersData);

    const chapterSelector = $("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li");

    const chapters: ChapterData[] = [];
    if (chapterSelector.length > 0) {

      chapterSelector.each((i, el) => {
        chapters.push({
          title: $(el).find("strong").text(),
          chapter: Number($(el).find("span.Capi").text().replace("Episodio ", "")),
          cover: AnimeflvUrls.images + ($(el).find("img").attr("src") as string),
          url: AnimeflvUrls.host + $(el).find("a").attr("href") as string
        });
      });

    }

    return chapters;

  }
  catch {
    return [];
  }
};