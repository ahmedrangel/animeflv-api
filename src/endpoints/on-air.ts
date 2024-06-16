import { type OpenAPIRouteSchema, OpenAPIRoute } from "@cloudflare/itty-router-openapi";
import { getOnAir } from "functions/getOnAir";
import { ExampleOnAir } from "constants/responseExamples";
import JsonResponse from "responses/jsonResponse";

export class onAir extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["On Air"],
    summary: "Devuelve un arreglo con los animes que actualmente están siendo transmitidos.",
    responses: {
      "200": {
        description: "Cada objeto en el arreglo contiene información como el título, el tipo, el id, y la url del anime. Estos objetos están ordenados de acuerdo a su fecha de transmisión, los animes más recientes estarán en la parte inferior del arreglo.",
        schema: {
          success: Boolean,
          onair: ExampleOnAir
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
    const onair = await getOnAir();
    return new JsonResponse({
      success: true,
      onair
    });
  }
}