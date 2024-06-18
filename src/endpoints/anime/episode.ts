import { type OpenAPIRouteSchema, OpenAPIRoute, Path } from "@cloudflare/itty-router-openapi";
import { ExampleEpisodeInfo } from "constants/responseExamples";
import { getEpisodeLinks } from "functions/getEpisodeLinks";
import ErrorResponse from "responses/errorResponse";

export class episode extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Info"],
    summary: "Devuelve un objeto con información detallada del episodio especificado por el parámetro `slug`.",
    parameters: {
      slug: Path(String, {
        description: "Slug del episodio.",
      }),
    },
    responses: {
      "200": {
        description: "El objeto contiene información como el título, títulos alternativos, estado, rating, tipo, portada, sinopsis, géneros, episodios, y url.",
        schema: {
          success: Boolean,
          episode: ExampleEpisodeInfo
        },
      },
      "404": {
        description: "No se ha encontrado el episodio",
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
    const episode = await getEpisodeLinks(slug);
    if (!episode) return new ErrorResponse(404, { success: false, error: "No se ha encontrado el episodio" });
    return {
      success: true,
      episode
    };
  }
}
