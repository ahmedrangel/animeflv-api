import { searchAnime } from "utils/scrapers/searchAnime";
import { ExampleSearch } from "constants/responseExamples";
import { type OpenAPIRouteSchema, OpenAPIRoute, Obj, Str, Bool } from "chanfana";
import { error } from "itty-router";

export class search extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Search"],
    summary: "Busca usando una consulta.",
    request: {
      query: Obj({
        query: Str({
          description: "La consulta de búsqueda para encontrar animes.",
          example: "boruto",
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
    const search = await searchAnime(query.query);
    if (!search || !search?.media?.length) return error(404, { success: false, error: "No se han encontrado resultados en la búsqueda" });
    return {
      success: true,
      data: search
    };
  }
}