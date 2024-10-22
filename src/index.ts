import { fromIttyRouter } from "chanfana";
import { AutoRouter, type IRequest, cors, error } from "itty-router";
import { info, search, latest, onAir, searchByFilter, searchByUrl, episode, episodeByAnimeSlugAndEpisodeNumber } from "./endpoints";
import { customSwaggerUI } from "utils/customSwaggerUI";
import { version } from "../package.json";
import { html } from "responses/html";
import { SITE } from "utils/site";
import { customSwaggerUIOptions, sendRedirect } from "utils";

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
  const ui = customSwaggerUI("/openapi.json", customSwaggerUIOptions);
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
  fetch: async (req, env, ctx) => {
    return router.fetch(req, env, ctx);
  }
} as ExportedHandler;
