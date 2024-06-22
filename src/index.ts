import { fromIttyRouter } from "chanfana";
import { IttyRouter, type IRequest, cors } from "itty-router";
import { info, search, latest, onAir, searchByFilter, searchByUrl, episode, episodeByAnimeSlugAndEpisodeNumber } from "./endpoints";
import { customSwaggerUI } from "utils/customSwaggerUI";
import { version } from "../package.json";
import { html } from "responses/html";
import { SITE } from "utils/site";
import { corsOptions, customSwaggerUIOptions } from "utils";

const BASE = "/api";
const itty = IttyRouter();

const { corsify } = cors(corsOptions);

export const router = fromIttyRouter(itty, {
  redoc_url: "/redoc",
  schema: {
    info: {
      title: SITE.title,
      description: SITE.description,
      version
    }
  },
});

itty.get("/", () => {
  const ui = customSwaggerUI("/openapi.json", customSwaggerUIOptions);
  return html(ui);
});

itty.get("/api", (req: IRequest) => {
  const host = req.headers.get("host") || "";
  const protocol = req.url.split("://")[0];
  const redirectTo = `${protocol}://${host}`;
  return Response.redirect(redirectTo, 301);
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
  Response.json({ success: false, error: "Route not found" },{ status: 404 })
);

export default {
  fetch: async (req, env, ctx) => {
    return router.fetch(req, env, ctx).then(corsify);
  }
} as ExportedHandler;
