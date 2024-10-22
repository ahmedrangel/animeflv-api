import type { customSwaggerUIOptionsTypes } from "types";
import { SITE } from "./site";

export * from "./scrapAnimeData";
export * from "./getPrevAndNextPages";
export * from "./executeSearch";

export const customSwaggerUIOptions: customSwaggerUIOptionsTypes = {
  title: SITE.title,
  description: SITE.description,
  dark: true,
  bgColor: "#1b2026",
  sectionHeaderBgColor: "#121212",
  getColor: "#22defa",
  codeBgColor: "#262626",
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
};

export const sendRedirect = (url: string, status: 301 | 302) => new Response(null, { status, headers: { Location: url } });