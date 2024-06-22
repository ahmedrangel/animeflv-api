import type { customSwaggerUIOptionsTypes } from "types";
import { SITE } from "./site";
import type { CorsOptions } from "itty-router";

export * from "./scrapAnimeData";
export * from "./getPrevAndNextPages";
export * from "./executeSearch";

export const customSwaggerUIOptions: customSwaggerUIOptionsTypes = {
  title: SITE.title,
  description: SITE.description,
  dark: true,
  bg_color: "#1b2026",
  section_header_bg_color: "#121212",
  get_color: "#22defa",
  code_bg_color: "#262626",
  show_servers: false,
  seo: {
    ogType: "website",
    ogTitle: SITE.title,
    ogDescription: SITE.description,
    ogSiteName: SITE.title,
    ogUrl: SITE.host,
    twitterTitle: SITE.title,
    twitterDescription: SITE.description,
  }
};

export const corsOptions: CorsOptions = {
  origin: "*",
  allowMethods: ["GET", "POST"],
};