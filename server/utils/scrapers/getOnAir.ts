import { load } from "cheerio";
import { $fetch } from "ofetch";
import type { AnimeOnAirData, AnimeType } from "../../types";

export const getOnAir = async (): Promise<AnimeOnAirData[]> => {
  try {
    const onAirData = await $fetch(AnimeflvUrls.host).catch(() => null);
    const $ = load(onAirData);

    const onAir: AnimeOnAirData[] = [];
    if ($(".ListSdbr > li").length > 0) {
      $(".ListSdbr > li").each((i, el) => {
        const temp: AnimeOnAirData = {
          title: $(el).find("a").remove("span").text(),
          type: $(el).find("a").children("span").text() as AnimeType,
          slug: $(el).find("a").attr("href")!.replace("/anime/", ""),
          url: AnimeflvUrls.host + $(el).find("a").attr("href") as string
        };

        onAir.push(temp);
      });
    }

    return onAir;
  }
  catch {
    return [];
  }
};
