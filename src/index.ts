import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { info, search, latest, onAir, searchByFilter, searchByUrl, episode, episodeByAnimeSlugAndEpisodNumber } from "./endpoints";
import { customSwaggerUI } from "utils/customSwaggerUI";
import { version } from "../package.json";

const BASE = "/api";

export const router = OpenAPIRouter({
  redoc_url: "/redoc",
  schema: {
    info: {
      title: "Unofficial AnimeFLV API",
      description: "API para interactuar con el sitio de AnimeFLV y obtener información útil.",
      version,
    },
  },
});

const customSwaggerUIResponse = () => {
  const bg = "#1b2026";
  return new Response(customSwaggerUI("/openapi.json", {
    dark: true,
    bg_color: bg,
    section_header_bg_color: "#121212",
    get_color: "#22defa",
    code_bg_color: "#262626"
  }), { headers: { "Content-Type": "text/html" } });
};

router.original.get("/", () => {
  return customSwaggerUIResponse();
});

router.original.get("/api", (req: Request) => {
  const host = req.headers.get("host") || "";
  const protocol = req.url.split("://")[0];
  const redirectTo = `${protocol}://${host}`;
  return Response.redirect(redirectTo, 301);
});

router.get(BASE + "/anime/:slug", info);
router.get(BASE + "/anime/episode/:slug", episode);
router.get(BASE + "/anime/:slug/episode/:number", episodeByAnimeSlugAndEpisodNumber);
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
    return router.handle(req, env, ctx);
  }
} as ExportedHandler;
