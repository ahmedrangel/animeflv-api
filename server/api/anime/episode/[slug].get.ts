import { getEpisode } from "animeflv-scraper";

export default defineCachedEventHandler(async (event) => {
  const { slug } = getRouterParams(event) as { slug: string };
  const episode = await getEpisode(slug);
  if (!episode) {
    throw createError({
      statusCode: 404,
      message: "No se ha encontrado el episodio",
      data: { success: false, error: "No se ha encontrado el episodio" }
    });
  }
  return {
    success: true,
    data: episode
  };
}, {
  swr: false,
  maxAge: 86400,
  name: "episode",
  group: "anime",
  getKey: (event) => {
    const { slug } = getRouterParams(event) as { slug: string };
    return slug;
  }
});

defineRouteMeta({
  openAPI: {
    tags: ["Anime"],
    summary: "Episodio por Slug",
    description: "Obtiene un episodio especificado por \"slug\".",
    parameters: [
      {
        name: "slug",
        in: "path",
        summary: "Slug que identifica el episodio.",
        example: "boruto-naruto-next-generations-tv-65",
        required: true,
        schema: {
          type: "string"
        }
      }
    ],
    responses: {
      200: {
        description: "Retorna un objeto que contiene información como el título, número y un arreglo de servers con nombres, url de descarga y url de embed.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                data: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    number: { type: "number" },
                    servers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          download: { type: "string" },
                          embed: { type: "string" }
                        },
                        required: ["name"]
                      }
                    }
                  },
                  required: ["title", "number", "servers"]
                }
              },
              required: ["success", "data"]
            }
          }
        }
      },
      404: {
        description: "No se ha encontrado el episodio.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: { type: "boolean", example: true },
                url: { type: "string" },
                statusCode: { type: "number", example: 404 },
                message: { type: "string" },
                data: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    error: { type: "string" }
                  },
                  required: ["success", "error"]
                }
              },
              required: ["error", "url", "statusCode", "message", "data"]
            }
          }
        }
      }
    }
  }
});
