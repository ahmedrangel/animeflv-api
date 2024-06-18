import { type OpenAPIRouteSchema, OpenAPIRoute } from "@cloudflare/itty-router-openapi";
import { getLatest } from "functions/getLatest";
import { ExampleLatest } from "constants/responseExamples";
import JsonResponse from "responses/jsonResponse";

export class latest extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["List"],
    summary: "Devuelve un arreglo con los últimos episodios subidos.",
    responses: {
      "200": {
        description: "Cada objeto en el arreglo contiene información como el título, el capítulo, la portada, y la url del episodio. Estos objetos están ordenados de manera cronológica, los últimos episodios estarán en la parte superior del arreglo.",
        schema: {
          success: Boolean,
          latest: ExampleLatest
        },
      },
      "404": {
        description: "No se han encontrado resultados",
        schema: {
          success: Boolean,
          error: String,
        },
      },
    },
  };

  async handle() {
    const latest = await getLatest();
    return new JsonResponse({
      success: true,
      latest
    });
  }
}
