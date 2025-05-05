import { load } from "cheerio";
import { $fetch } from "ofetch";
import { AnimeflvUrls } from "../../constants";
import { SITE } from "../../utils/site";
import type { AnimeGenre, AnimeInfoData, AnimeRelated, AnimeStatus, AnimeType } from "../../types";

export const getAnimeInfo = async (
  animeId: string
): Promise<AnimeInfoData | null> => {
  const apiUrl = `${SITE.host}/api/anime/${animeId}`;
  const cacheKey = new Request(apiUrl);
  const cache = caches.default;

  // Obtenemos la información de la caché
  const cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    const entry = await cachedResponse.json() as { value: AnimeInfoData | null, expiresAt: number };
    if (entry && entry.expiresAt > Date.now()) {
      return entry.value;
    }
    await cache.delete(cacheKey);
  }

  // Si no está en caché o expiró
  try {
    const url = `${AnimeflvUrls.host}/anime/${animeId}`;
    const html = await $fetch<string>(url).catch(() => null);
    if (!html) return null;

    const $ = load(html);

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
      const relation = $(el).text().match(/\(([^)]+)\)$/)?.[1];
      if (href && title) {
        const slug = href.match(/\/anime\/([^\/]+)/)?.[1] || href;
        relatedAnimes.push({
          title,
          relation,
          slug,
          url: `${AnimeflvUrls.host}${href}`
        });
      }
    });

    // Asigna la propiedad si hay elementos
    if (relatedAnimes.length > 0) {
      animeInfo.related = relatedAnimes;
    }

    // Almacena en caché por 24 horas
    const ttlSeconds = 86400;
    const response = new Response(JSON.stringify({ value: animeInfo, expiresAt: Date.now() + ttlSeconds * 1000 }));
    response.headers.set("Cache-Control", `public, max-age=${ttlSeconds}`);
    await cache.put(cacheKey, response);

    return animeInfo;

  }
  catch (error) {
    console.error("Error al obtener la información del anime:", error);
    return null;
  }
};