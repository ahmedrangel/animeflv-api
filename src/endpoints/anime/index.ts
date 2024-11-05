import { Bool, Obj, OpenAPIRoute, type OpenAPIRouteSchema, Str } from "chanfana";
import { getAnimeInfo } from "utils/scrapers/getAnimeInfo";
import { ExampleInfo } from "constants/responseExamples";
import { error } from "itty-router";

export class info extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Anime"],
    request: {
      params: Obj({
        slug: Str({
          description: "El slug del anime.",
          example: "boruto-naruto-next-generations-tv",
          required: true
        })
      })
    },
    summary: "Obtiene un anime especificado por \"slug\".",
    responses: {
      200: {
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
      404: {
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

  async handle () {
    const { params } = await this.getValidatedData<typeof this.schema>();
    const { slug } = params as { slug: string };
    const info = await getAnimeInfo(slug);
    if (!info) return error(404, { success: false, error: "No se ha encontrado el anime" });
    return {
      success: true,
      data: info
    };
  }
}
