import { type OpenAPIRouteSchema, OpenAPIRoute, Obj, Bool } from "chanfana";
import { getLatest } from "functions/getLatest";
import { ExampleLatest } from "constants/responseExamples";
import { error } from "itty-router";

export class latest extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["List"],
    summary: "Devuelve un arreglo con los últimos episodios subidos.",
    responses: {
      200: {
        description: "Cada objeto en el arreglo contiene información como el título, el capítulo, la portada, y la url del episodio. Estos objetos están ordenados de manera cronológica, los últimos episodios estarán en la parte superior del arreglo.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: true }),
              data: ExampleLatest
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
    const latest = await getLatest();
    if (!latest) return error(404, { success: false, error: "No se han encontrado resultados" });
    return {
      success: true,
      data: latest
    };
  }
}
