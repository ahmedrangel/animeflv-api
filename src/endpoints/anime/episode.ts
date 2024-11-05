import { Bool, Num, Obj, OpenAPIRoute, type OpenAPIRouteSchema, Str } from "chanfana";
import { error, json } from "itty-router";
import { ExampleEpisodeInfo } from "constants/responseExamples";
import { getEpisodeLinks } from "utils/scrapers/getEpisodeLinks";

export class episode extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Anime"],
    summary: "Obtiene un episodio especificado por \"slug\".",
    request: {
      params: Obj({
        slug: Str({
          description: "El slug del episodio.",
          example: "boruto-naruto-next-generations-tv-65",
          required: true
        })
      })
    },
    responses: {
      200: {
        description: "El objeto contiene información como el título, número y un arreglo de servers con nombres, url de descarga y url de embed.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: true }),
              data: ExampleEpisodeInfo
            })
          }
        }
      },
      404: {
        description: "No se ha encontrado el episodio.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: false }),
              error: "No se ha encontrado el episodio"
            })
          }
        }
      }
    }
  };

  async handle () {
    const { params } = await this.getValidatedData<typeof this.schema>();
    const { slug } = params as { slug: string };
    const episode = await getEpisodeLinks(slug);
    if (!episode) return error(404, { success: false, error: "No se ha encontrado el episodio" });
    return {
      success: true,
      data: episode
    };
  }
}


export class episodeByAnimeSlugAndEpisodeNumber extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Anime"],
    summary: "Obtiene un episodio especificado por \"slug\" y \"number\".",
    request: {
      params: Obj({
        slug: Str({
          description: "El slug del anime.",
          example: "boruto-naruto-next-generations-tv",
          required: true
        }),
        number: Num({
          description: "Número de episodio.",
          example: 65,
          required: true
        })
      })
    },
    responses: {
      200: {
        description: "El objeto contiene información como el título, número y un arreglo de servers con nombres, url de descarga y url de embed.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: true }),
              data: ExampleEpisodeInfo
            })
          }
        }
      },
      404: {
        description: "No se ha encontrado el episodio.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: false }),
              error: "No se ha encontrado el episodio"
            })
          }
        }
      }
    }
  };

  async handle () {
    const { params } = await this.getValidatedData<typeof this.schema>();
    const { slug, number } = params as { slug: string, number: number };
    const episode = await getEpisodeLinks(slug, number);
    if (!episode) return error(404, { success: false, error: "No se ha encontrado el episodio" });
    return json({
      success: true,
      data: episode
    });
  }
}
