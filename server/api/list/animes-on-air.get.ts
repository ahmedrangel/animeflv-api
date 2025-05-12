export default defineEventHandler(async () => {
  const onair = await getOnAir();
  if (!onair) {
    throw createError({
      statusCode: 404,
      statusMessage: "No se han encontrado resultados",
      data: { success: false, error: "No se han encontrado resultados" }
    });
  }
  return {
    success: true,
    data: onair
  };
});

defineRouteMeta({
  openAPI: {
    tags: ["List"],
    summary: "Lista de animes en emisión",
    description: "Obtiene una lista de animes en emisión.",
    responses: {
      200: {
        description: "Retorna un arreglo de objetos que contienen información como el título, el tipo, el slug, y la url del anime. Estos objetos están ordenados de acuerdo a su fecha de transmisión, los animes más recientes estarán en la parte inferior del arreglo.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      type: { type: "string" },
                      slug: { type: "string" },
                      url: { type: "string" }
                    },
                    required: ["title", "type", "slug", "url"]
                  }
                }
              }
            }
          }
        }
      },
      404: {
        description: "No se han encontrado resultados.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: { type: "boolean", example: true },
                url: { type: "string" },
                statusCode: { type: "number", example: 404 },
                statusMessage: { type: "string" },
                data: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    error: { type: "string" }
                  },
                  required: ["success", "error"]
                }
              },
              required: ["error", "url", "statusCode", "statusMessage", "data"]
            }
          }
        }
      }
    }
  }
});
