import { load } from "cheerio";
import { $fetch } from "ofetch";

export const getEpisodeLinks = async (slug: string, number?: number): Promise<EpisodeInfoData | null> => {
  try {
    const episodeData = async () => {
      if (slug && !number)
        return await $fetch(AnimeflvUrls.host + "/ver/" + slug).catch(() => null);
      else if (slug && number)
        return await $fetch(AnimeflvUrls.host + "/ver/" + slug + "-" + number).catch(() => null);
      else return null;
    };

    if (!(await episodeData())) return null;

    const $ = load(await episodeData());

    const episodeLinks: EpisodeInfoData = {
      title: $("body > div.Wrapper > div.Body > div > div > div > nav.Brdcrmb > a").next("i").next("a").text(),
      number: Number($("body > div.Wrapper > div.Body > div > div > div > div.CapiTop > h2.SubTitle").text().replace("Episodio ", "")),
      servers: [] as EpisodeServersData[]
    };

    const scripts = $("script");
    const serversFind = scripts.map((_, el) => $(el).html()).get().find(script => script?.includes("var videos ="));
    const serversObj = serversFind?.match(/var videos = (\{.*\})/)?.[1];
    if (serversObj) {
      const servers = JSON.parse(serversObj).SUB;
      for (const s of servers) {
        episodeLinks.servers.push({
          name: s?.title,
          download: s?.url?.replace("mega.nz/#!", "mega.nz/file/"),
          embed: s?.code?.replace("mega.nz/embed#!", "mega.nz/embed/")
        });
      }
    }

    const otherDownloads = $("body > div.Wrapper > div.Body > div > div > div > div > div > table > tbody > tr");

    for (const el of otherDownloads) {
      const name = $(el).find("td").eq(0).text();
      const lookFor = ["Zippyshare", "1Fichier"];
      if (lookFor.includes(name)) {
        episodeLinks.servers.push({
          name: $(el).find("td").eq(0).text(),
          download: $(el).find("td:last-child a").attr("href") as string
        });
      }
    }
    return episodeLinks;
  }
  catch (e) {
    console.error(e);
    return null;
  }
};
