import { ExampleSearch } from "constants/responseExamples";
import { searchAnimesBySpecificURL } from "functions/searchAnimesByUrl";
import type { OpenAPIRouteSchema } from "chanfana";
import { Bool, Obj, OpenAPIRoute, Str } from "chanfana";
import { error } from "itty-router";

export class searchByUrl extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Search"],
    summary: "Busca usando una URL de consulta y devuelve un objeto con lo encontrado. El URL puede ser obtenido de las propiedades \"previousPage\" y \"nextPage\" de otros métodos",
    request: {
      query: Obj({
        url: Str({
          description: "La URL de consulta.",
          example: "https://www3.animeflv.net/browse?genre%5B%5D=shounen&type%5B%5D=tv&status%5B%5D=1&order=default",
          required: true
        })
      })
    },
    responses: {
      "200": {
        description: "El objeto tiene varios atributos, incluyendo \"previousPage\" y \"nextPage\", que indican si hay más páginas de resultados disponibles antes o después de la página actual. El atributo \"foundPages\" indica cuántas páginas de resultados se encontraron en total. El atributo \"data\" es un arreglo que contiene objetos con información detallada sobre cada anime encontrado. Cada objeto contiene información como el título, la portada, el sinopsis, la calificación, el slug, el tipo y la url del anime.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: true }),
              data: ExampleSearch
            })
          }
        }
      },
      "404": {
        description: "No se han encontrado resultados en la búsqueda.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: false }),
              error: "No se han encontrado resultados en la búsqueda"
            })
          }
        }
      }
    }
  };

  async handle() {
    const { query } = await this.getValidatedData<typeof this.schema>();
    const { url } = query;
    const search = await searchAnimesBySpecificURL(url);
    if (!search || !search?.media?.length) return error(404, { success: false, error: "No se han encontrado resultados en la búsqueda" });
    return {
      success: true,
      data: search
    };
  }
}