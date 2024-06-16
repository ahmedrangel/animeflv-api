import { type OpenAPIRouteSchema, OpenAPIRoute, Path } from "@cloudflare/itty-router-openapi";
import { getAnimeInfo } from "functions/getAnimeInfo";
import { ExampleInfo } from "constants/responseExamples";

export class info extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Info"],
    summary: "Devuelve un objeto con información detallada del anime especificado por el parámetro `slug`.",
    parameters: {
      slug: Path(String, {
        description: "Slug del anime.",
      }),
    },
    responses: {
      "200": {
        description: "El objeto contiene información como el título, títulos alternativos, estado, rating, tipo, portada, sinopsis, géneros, episodios, y url.",
        schema: {
          success: Boolean,
          info: ExampleInfo
        },
      },
      "404": {
        description: "No se ha encontrado el anime",
        schema: {
          success: Boolean,
          error: String,
        },
      },
    },
  };

  async handle(req: Request, env: any, ctx: any, data: Record<string, any>) {
    console.log(data.params);
    const { slug } = data.params as Record<string, string>;
    const info = await getAnimeInfo(slug);
    return {
      success: true,
      info
    };
  }
}
