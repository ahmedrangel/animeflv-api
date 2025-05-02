import { load } from "cheerio";
import { $fetch } from "ofetch";
import { AnimeflvUrls } from "../../constants";
import type { AnimeGenre, AnimeInfoData, AnimeRelated, AnimeStatus, AnimeType } from "../../types";

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
      genres: $("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a")
        .map((_, el) => $(el).text().trim())
        .get() as AnimeGenre[],
      next_airing_episode: JSON.parse($("script").eq(15).text().match(/anime_info = (\[.*\])/)?.[1])?.[3],
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

    // Relacionados
    const relatedEls = $("ul.ListAnmRel > li");
    const relatedAnimes: AnimeRelated[] = [];

    relatedEls.each((_, el) => {
      const link = $(el).find("a");
      const href = link.attr("href");
      const title = link.text().trim();
      const relationMatch = $(el).text().match(/\(([^)]+)\)$/);
    
      if (href && title) {
        const slugMatch = href.match(/\/anime\/([^\/]+)/);
        const slug = slugMatch ? slugMatch[1] : null;
    
        relatedAnimes.push({
          title,
          relation: relationMatch?.[1],
          slug: slug || href,
          url: `${AnimeflvUrls.host}${href}`
        });
      }
    });

    // Asigna la propiedad si hay elementos
    if (relatedAnimes.length > 0) {
      animeInfo.related = relatedAnimes;
    }

    return animeInfo;
  }
  catch {
    return null;
  }
};