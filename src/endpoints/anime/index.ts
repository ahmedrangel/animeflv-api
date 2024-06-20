import { type OpenAPIRouteSchema, OpenAPIRoute, Obj, Bool, Str } from "chanfana";
import { getAnimeInfo } from "functions/getAnimeInfo";
import { ExampleInfo } from "constants/responseExamples";
import ErrorResponse from "responses/errorResponse";
import type { IRequest } from "itty-router";
import JsonResponse from "responses/jsonResponse";

export class info extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Info"],
    request: {
      params: Obj({
        slug: Str({
          description: "El slug del anime.",
          example: "boruto-naruto-next-generations-tv",
          required: true
        })
      })
    },
    summary: "Devuelve un objeto con información detallada del anime especificado por el parámetro \"slug\".",
    responses: {
      "200": {
        description: "El objeto contiene información como el título, títulos alternativos, estado, rating, tipo, portada, sinopsis, géneros, episodios, y url.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: true }),
              data: ExampleInfo
            })
          }
        }
      },
      "404": {
        description: "No se ha encontrado el anime.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: false }),
              error: "No se ha encontrado el anime"
            })
          }
        }
      }
    }
  };

  async handle(req: IRequest) {
    const { slug } = req.params as Record<string, string>;
    const info = await getAnimeInfo(slug);
    if (!info) return new ErrorResponse(404, { success: false, error: "No se ha encontrado el anime" });
    return new JsonResponse({
      success: true,
      data: info
    });
  }
}
