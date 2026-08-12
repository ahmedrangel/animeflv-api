import { version } from "../../package.json" with { type: "json" };

export const SITE = {
  title: "Unofficial AnimeFLV API",
  description: "API para interactuar con el sitio de AnimeFLV y obtener información útil",
  host: import.meta.dev ? "http://localhost:5173" : "https://animeflv.ahmedrangel.com",
  version
};
