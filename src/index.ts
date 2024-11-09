import { version } from "../package.json";
import { fromIttyRouter } from "chanfana";
import { AutoRouter, type IRequest, cors, error, html } from "itty-router";
import { episode, episodeByAnimeSlugAndEpisodeNumber, info, latest, onAir, search, searchByFilter, searchByUrl } from "./endpoints";
import { customSwaggerUI } from "utils/customSwaggerUI";
import { sendRedirect } from "utils/responses";
import { SITE } from "utils/site";

const BASE = "/api";

const { preflight, corsify } = cors();
const itty = AutoRouter({
  before: [preflight],
  catch: error,
  finally: [corsify]
});

export const router = fromIttyRouter(itty, {
  redoc_url: "/redoc",
  schema: {
    info: {
      title: SITE.title,
      description: SITE.description,
      version
    }
  }
});

itty.get("/", () => {
  const ui = customSwaggerUI("/openapi.json", {
    title: SITE.title,
    description: SITE.description,
    defaultColorMode: "dark",
    showServers: false,
    seo: {
      ogType: "website",
      ogTitle: SITE.title,
      ogDescription: SITE.description,
      ogSiteName: SITE.title,
      ogUrl: SITE.host,
      twitterTitle: SITE.title,
      twitterDescription: SITE.description
    }
  });
  return html(ui);
});

itty.get(BASE, (req: IRequest) => {
  const host = req.headers.get("host") || "";
  const protocol = req.url.split("://")[0];
  const redirectTo = `${protocol}://${host}`;
  return sendRedirect(redirectTo, 301);
});

router.get(BASE + "/anime/:slug", info);
router.get(BASE + "/anime/episode/:slug", episode);
router.get(BASE + "/anime/:slug/episode/:number", episodeByAnimeSlugAndEpisodeNumber);
router.get(BASE + "/search", search);
router.post(BASE + "/search/by-filter", searchByFilter);
router.get(BASE + "/search/by-url", searchByUrl);
router.get(BASE + "/list/latest-episodes", latest);
router.get(BASE + "/list/animes-on-air", onAir);

// 404 for everything else
router.all("*", () =>
  Response.json({ success: false, error: "Route not found" }, { status: 404 })
);

export default {
  fetch: async (req, env, ctx) => router.fetch(req, env, ctx)
} as ExportedHandler;
