import { fromIttyRouter } from "chanfana";
import { IttyRouter } from "itty-router";
import { info, search, latest, onAir, searchByFilter, searchByUrl, episode, episodeByAnimeSlugAndEpisodeNumber } from "./endpoints";
import { customSwaggerUI } from "utils/customSwaggerUI";
import { version } from "../package.json";
import HtmlResponse from "responses/htmlResponse";
import { SITE } from "utils/site";
import { customSwaggerUIOptions } from "utils";

const BASE = "/api";

export const router = fromIttyRouter(IttyRouter(), {
  redoc_url: "/redoc",
  schema: {
    info: {
      title: SITE.title,
      description: SITE.description,
      version
    }
  },
});

router.original.get("/", () => {
  const html = customSwaggerUI("/openapi.json", customSwaggerUIOptions);
  return new HtmlResponse(html);
});

router.original.get("/api", (req: Request) => {
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
    return router.fetch(req, env, ctx);
  }
} as ExportedHandler;
