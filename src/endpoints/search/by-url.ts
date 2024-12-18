import { ExampleSearch } from "constants/responseExamples";
import { searchAnimesBySpecificURL } from "utils/scrapers/searchAnimesByUrl";
import { Bool, Obj, OpenAPIRoute, type OpenAPIRouteSchema, Str } from "chanfana";
import { error } from "itty-router";

export class searchByUrl extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Search"],
    summary: "Busca usando una URL.",
    request: {
      query: Obj({
        url: Str({
          description: "La URL de consulta.",
          example: "https://www3.animeflv.net/browse?genre%5B%5D=shounen&type%5B%5D=tv&order=default&page=2",
          required: true
        })
      })
    },
    responses: {
      200: {
        description: "Obtiene un objeto con varios atributos, incluyendo \"previousPage\" y \"nextPage\", que indican si hay más páginas de resultados disponibles antes o después de la página actual. El atributo \"foundPages\" indica cuántas páginas de resultados se encontraron en total. El atributo \"data\" es un arreglo que contiene objetos con información detallada sobre cada anime encontrado. Cada objeto contiene información como el título, la portada, el sinopsis, la calificación, el slug, el tipo y la url del anime.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: true }),
              data: ExampleSearch
            })
          }
        }
      },
      404: {
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

  async handle () {
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