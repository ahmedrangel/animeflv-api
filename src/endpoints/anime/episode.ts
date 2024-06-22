import { type OpenAPIRouteSchema, OpenAPIRoute, Obj, Str, Bool, Num } from "chanfana";
import { ExampleEpisodeInfo } from "constants/responseExamples";
import { getEpisodeLinks } from "functions/getEpisodeLinks";
import type { IRequest } from "itty-router";
import ErrorResponse from "responses/errorResponse";
import JsonResponse from "responses/jsonResponse";

export class episode extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Info"],
    summary: "Devuelve un objeto con información detallada del episodio especificado por el parámetro \"slug\".",
    request: {
      params: Obj({
        slug: Str({
          description: "El slug del episodio.",
          example: "boruto-naruto-next-generations-tv-65",
          required: true,
        }),
      })
    },
    responses: {
      "200": {
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
      "404": {
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

  async handle(req: IRequest) {
    const { slug } = req.params as Record<string, string>;
    const episode = await getEpisodeLinks(slug);
    if (!episode) return new ErrorResponse(404, { success: false, error: "No se ha encontrado el episodio" });
    return new JsonResponse({
      success: true,
      data: episode
    });
  }
}


export class episodeByAnimeSlugAndEpisodeNumber extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Info"],
    summary: "Devuelve un objeto con información detallada del episodio especificado el anime por el parámetro \"slug\" y el episodio por el parámetro \"number\".",
    request: {
      params: Obj({
        slug: Str({
          description: "El slug del anime.",
          example: "boruto-naruto-next-generations-tv",
          required: true,
        }),
        number: Num({
          description: "Número de episodio.",
          example: 65,
          required: true,
        }),
      })
    },
    responses: {
      "200": {
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
      "404": {
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
    },
  };

  async handle() {
    const { params } = await this.getValidatedData<typeof this.schema>();
    const { slug, number } = params as Record<string, any>;
    const episode = await getEpisodeLinks(slug, number);
    if (!episode) return new ErrorResponse(404, { success: false, error: "No se ha encontrado el episodio" });
    return new JsonResponse({
      success: true,
      data: episode
    });
  }
}
