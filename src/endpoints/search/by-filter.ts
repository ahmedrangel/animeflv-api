import { ExampleSearchByFilter } from "constants/responseExamples";
import { searchAnimesByFilter } from "utils/scrapers/searchAnimesByFilter";
import { Arr, Bool, Enumeration, Int, Obj, OpenAPIRoute, type OpenAPIRouteSchema, convertParams } from "chanfana";
import { type IRequest, error } from "itty-router";
import { z } from "zod";
import type { FilterOrderType } from "types";
import { AnimeGenreEnum, AnimeStatusEnum, AnimeTypeEnum, FilterOrderEnum } from "../../constants";

const genres = Object.values(AnimeGenreEnum);
const statuses = Object.values(AnimeStatusEnum);
const types = Object.values(AnimeTypeEnum);
const orders = Object.values(FilterOrderEnum);

export class searchByFilter extends OpenAPIRoute {
  schema: OpenAPIRouteSchema = {
    tags: ["Search"],
    summary: "Busca usando filtros.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: Obj({
              types: convertParams(Arr(Enumeration({
                values: types,
                enumCaseSensitive: true
              })), {
                description: "Tipos de anime.",
                example: types,
                required: false
              }),
              genres: convertParams(Arr(Enumeration({
                values: genres,
                enumCaseSensitive: true
              })).max(4), {
                description: "Géneros de anime.",
                example: genres.slice(0, 4),
                required: false
              }),
              statuses: convertParams(Arr(z.nativeEnum(AnimeStatusEnum)), {
                description: "Estados de anime.",
                example: statuses,
                required: false
              })
            })
          }
        }
      },
      query: Obj({
        order: Enumeration({
          description: "Especificar el orden de los resultados.",
          values: orders,
          example: "default",
          required: false
        }),
        page: Int({
          description: "Especificar el número de página.",
          required: false
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
              data: ExampleSearchByFilter
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
      },
      400: {
        description: "Bad Request.",
        content: {
          "application/json": {
            schema: Obj({
              success: Bool().openapi({ example: false }),
              error: "Bad Request"
            })
          }
        }
      }
    }
  };

  async handle (req: IRequest) {
    const textBody = await req.text().catch(() => null) as string;

    let body = null;
    if (textBody !== "") {
      try { body = JSON.parse(textBody) as Record<string, any>; }
      catch { return error(400, { success: false, error: "Bad Request" }); }
    }

    const { query } = await this.getValidatedData<typeof this.schema>();
    const { order, page } = query as { order: FilterOrderType, page: number };

    const invalid_order = !orders?.includes(order);
    if (order && invalid_order)
      return error(400, { success: false, error: `Orden no válido: ${order}`, hint: orders });

    const invalid_types = body?.types?.filter((t: string) => !types?.includes(t));
    if (invalid_types?.length)
      return error(400, { success: false, error: `Tipos no válidos: ${invalid_types?.join(", ")}`, hint: types });

    const invalid_genres = body?.genres?.filter((g: string) => !genres?.includes(g));
    if (invalid_genres?.length)
      return error(400, { success: false, error: `Géneros no válido: ${invalid_genres?.join(", ")}`, hint: genres });

    const invalid_statuses = body?.statuses?.filter((s: number) => !statuses?.includes(s));
    if (invalid_statuses?.length)
      return error(400, { success: false, error: `Estados no válidos: ${invalid_statuses?.join(", ")}`, hint: AnimeStatusEnum });

    if (body?.genres?.length > 4)
      return error(400, { success: false, error: "Solo se permite un máximo 4 géneros" });

    const search = await searchAnimesByFilter({ ...body, order, page });
    if (!search || !search?.media?.length) return error(404, { success: false, error: "No se han encontrado resultados en la búsqueda" });
    return {
      success: true,
      data: search
    };
  }
}