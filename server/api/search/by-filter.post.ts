const genres = Object.values(AnimeGenreEnum);
const statuses = Object.values(AnimeStatusEnum);
const types = Object.values(AnimeTypeEnum);
const orders = Object.values(FilterOrderEnum);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { order, page } = getQuery(event) as { order: FilterOrderType, page: number };

  const invalid_order = !orders?.includes(order);
  if (order && invalid_order) {
    throw createError({
      statusCode: 400,
      message: `Orden no válido: ${order}`,
      data: { success: false, error: `Orden no válido: ${order}`, hint: orders }
    });
  }

  const invalid_types = body?.types?.filter((t: string) => !types?.includes(t));
  if (invalid_types?.length) {
    throw createError({
      statusCode: 400,
      message: `Tipos no válidos: ${invalid_types?.join(", ")}`,
      data: { success: false, error: `Tipos no válidos: ${invalid_types?.join(", ")}`, hint: types }
    });
  }

  const invalid_genres = body?.genres?.filter((g: string) => !genres?.includes(g));
  if (invalid_genres?.length) {
    throw createError({
      statusCode: 400,
      message: `Géneros no válidos: ${invalid_genres?.join(", ")}`,
      data: { success: false, error: `Géneros no válidos: ${invalid_genres?.join(", ")}`, hint: genres }
    });
  }

  const invalid_statuses = body?.statuses?.filter((s: number) => !statuses?.includes(s));
  if (invalid_statuses?.length) {
    throw createError({
      statusCode: 400,
      message: `Estados no válidos: ${invalid_statuses?.join(", ")}`,
      data: { success: false, error: `Estados no válidos: ${invalid_statuses?.join(", ")}`, hint: AnimeStatusEnum }
    });
  }

  if (body?.genres?.length > 4) {
    throw createError({
      statusCode: 400,
      message: "Solo se permite un máximo de 4 géneros",
      data: { success: false, error: "Solo se permite un máximo de 4 géneros" }
    });
  }

  const search = await searchAnimesByFilter({ ...body, order, page });
  if (!search || !search?.media?.length) {
    throw createError({
      statusCode: 404,
      message: "No se han encontrado resultados en la búsqueda",
      data: { success: false, error: "No se han encontrado resultados en la búsqueda" }
    });
  }
  return {
    success: true,
    data: search
  };
});

defineRouteMeta({
  openAPI: {
    tags: ["Search"],
    summary: "Busca usando filtros",
    description: "Ejecuta una búsqueda de animes utilizando filtros como tipo, géneros y estados.",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              types: {
                type: "array",
                description: "Tipos de anime.",
                example: ["tv", "movie", "special", "ova"],
                items: {
                  type: "string",
                  enum: ["tv", "movie", "special", "ova"]
                }
              },
              genres: {
                type: "array",
                description: "Géneros de anime.",
                example: ["accion", "artes-marciales", "aventura", "carreras"],
                items: {
                  type: "string",
                  enum: [
                    "accion",
                    "artes-marciales",
                    "aventura",
                    "carreras",
                    "ciencia-ficcion",
                    "comedia",
                    "demencia",
                    "demonios",
                    "deportes",
                    "drama",
                    "ecchi",
                    "escolares",
                    "espacial",
                    "fantasia",
                    "harem",
                    "historico",
                    "infantil",
                    "josei",
                    "juegos",
                    "magia",
                    "mecha",
                    "militar",
                    "misterio",
                    "musica",
                    "parodia",
                    "policia",
                    "psicologico",
                    "recuentos-de-la-vida",
                    "romance",
                    "samurai",
                    "seinen",
                    "shoujo",
                    "shounen",
                    "sobrenatural",
                    "superpoderes",
                    "suspenso",
                    "terror",
                    "vampiros",
                    "yaoi",
                    "yuri"
                  ]
                },
                maxItems: 4
              },
              statuses: {
                type: "array",
                description: "Estados de anime.",
                example: [1, 2, 3],
                items: {
                  type: "number",
                  enum: [1, 2, 3]
                }
              }
            }
          }
        }
      }
    },
    parameters: [
      {
        name: "order",
        in: "query",
        summary: "Especificar el orden de los resultados.",
        required: false,
        example: "default",
        schema: {
          type: "string",
          enum: ["default", "updated", "added", "title", "rating"]
        }
      },
      {
        name: "page",
        in: "query",
        summary: "Especificar el número de página.",
        example: 1,
        required: false,
        schema: {
          type: "number"
        }
      }
    ],
    responses: {
      200: {
        description: "Retorna un objeto con varios atributos, incluyendo \"previousPage\" y \"nextPage\", que indican si hay más páginas de resultados disponibles antes o después de la página actual. El atributo \"foundPages\" indica cuántas páginas de resultados se encontraron en total. El atributo \"data\" es un arreglo que contiene objetos con información detallada sobre cada anime encontrado. Cada objeto contiene información como el título, la portada, el sinopsis, la calificación, el slug, el tipo y la url del anime.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                data: {
                  type: "object",
                  properties: {
                    currentPage: { type: "number", example: 1 },
                    hasNextPage: { type: "boolean" },
                    previousPage: { type: "string", nullable: true },
                    nextPage: { type: "string", nullable: true },
                    foundPages: { type: "number", example: 10 },
                    media: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          cover: { type: "string" },
                          synopsis: { type: "string" },
                          rating: { type: "string" },
                          slug: { type: "string" },
                          type: { type: "string" },
                          url: { type: "string" }
                        },
                        required: ["title", "cover", "synopsis", "rating", "slug", "type", "url"]
                      }
                    }
                  },
                  required: ["currentPage", "hasNextPage", "previousPage", "nextPage", "foundPages", "media"]
                }
              },
              required: ["success", "data"]
            }
          }
        }
      },
      404: {
        description: "No se han encontrado resultados en la búsqueda.",
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
      },
      400: {
        description: "Bad Request.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: { type: "boolean", example: true },
                url: { type: "string" },
                statusCode: { type: "number", example: 400 },
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
