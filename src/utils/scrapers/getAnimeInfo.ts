import { load } from "cheerio";
import { $fetch } from "ofetch";
import type { AnimeGenre, AnimeInfoData, AnimeStatus, AnimeType } from "../../types";
import { AnimeflvUrls } from "../../constants";

export const getAnimeInfo = async (animeId: string): Promise<AnimeInfoData | null> => {
  try {
    const url = AnimeflvUrls.host + "/anime/" + animeId;
    const animeData = await $fetch(url).catch(() => null);
    const $ = load(animeData);

    const animeInfo: AnimeInfoData = {
      title: $("body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > h1").text(),
      alternative_titles: [],
      status: $("body > div.Wrapper > div > div > div.Container > div > aside > p > span").text() as AnimeStatus,
      rating: $("#votes_prmd").text(),
      type: $("body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > span").text() as AnimeType,
      cover: AnimeflvUrls.images + ($("body > div.Wrapper > div > div > div.Container > div > aside > div.AnimeCover > div > figure > img").attr("src") as string),
      synopsis: $("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > div.Description > p").text(),
      genres: $("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a").text().split(/(?=[A-Z])/) as AnimeGenre[],
      episodes: [],
      url
    };

    for (let i = 1; i <= JSON.parse($("script").eq(15).text().match(/episodes = (\[\[.*\].*])/)?.[1] as string).length; i++) {
      if (animeInfo.episodes instanceof Array) {
        animeInfo.episodes.push({
          number: i,
          slug: animeId + "-" + i,
          url: AnimeflvUrls.host + "/ver/" + animeId + "-" + i
        });
      }
    }

    $("body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3) > span").each((i, el) => {
      animeInfo.alternative_titles.push($(el).text());
    });

    return animeInfo;
  }
  catch {
    return null;
  }
};