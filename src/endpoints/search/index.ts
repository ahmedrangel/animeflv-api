import { type OpenAPIRouteSchema, OpenAPIRoute, Query } from "@cloudflare/itty-router-openapi";
import { searchAnime } from "functions/searchAnime";
import { ExampleSearch } from "constants/responseExamples";
import JsonResponse from "responses/jsonResponse";
import ErrorResponse from "responses/errorResponse";

export class search extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Search"],
    summary: "Busca y devuelve un objeto usando una consulta.",
    parameters: {
      query: Query(String, {
        description: "Parámetro de consulta.",
      }),
    },
    responses: {
      "200": {
        description: "El objeto tiene varios atributos, incluyendo \"previousPage\" y \"nextPage\", que indican si hay más páginas de resultados disponibles antes o después de la página actual. El atributo \"foundPages\" indica cuántas páginas de resultados se encontraron en total. El atributo \"data\" es un arreglo que contiene objetos con información detallada sobre cada anime encontrado. Cada objeto contiene información como el título, la portada, el sinopsis, la calificación, el slug, el tipo y la url del anime.",
        schema: {
          success: Boolean,
          search: ExampleSearch
        },
      },
      "404": {
        description: "No se han encontrado resultados en la búsqueda",
        schema: {
          success: Boolean,
          error: String,
        },
      },
    },
  };

  async handle(req: Request, env: any, ctx: any, data: Record<string, any>) {
    const { query } = data.query as Record<string, string>;
    const search = await searchAnime(query);
    if (!search || !search?.data?.length) return new ErrorResponse(404, { success: false, error: "No se han encontrado resultados en la búsqueda" });
    return new JsonResponse({
      success: true,
      search
    });
  }
}