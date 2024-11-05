import { Bool, Obj, OpenAPIRoute, type OpenAPIRouteSchema } from "chanfana";
import { getOnAir } from "utils/scrapers/getOnAir";
import { ExampleOnAir } from "constants/responseExamples";
import { error } from "itty-router";

export class onAir extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["List"],
    summary: "Obtiene una lista de animes en emisión.",
    responses: {
      200: {
        description: "Cada objeto en el arreglo contiene información como el título, el tipo, el slug, y la url del anime. Estos objetos están ordenados de acuerdo a su fecha de transmisión, los animes más recientes estarán en la parte inferior del arreglo.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: true }),
              data: ExampleOnAir
            })
          }
        }
      },
      404: {
        description: "No se han encontrado resultados.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: false }),
              error: "No se han encontrado resultados"
            })
          }
        }
      }
    }
  };

  async handle () {
    const onair = await getOnAir();
    if (!onair) return error(404, { success: false, error: "No se han encontrado resultados" });
    return {
      success: true,
      data: onair
    };
  }
}
