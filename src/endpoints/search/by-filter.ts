import { type OpenAPIRouteSchema, OpenAPIRoute, Query, Arr } from "@cloudflare/itty-router-openapi";
import { AnimeGenreEnum, AnimeStatusEnum, AnimeStatuses, AnimeTypeEnum, FilterOrderEnum } from "../../constants";
import { searchAnimesByFilter } from "functions/searchAnimesByFilter";
import { ExampleSearchByFilter } from "constants/responseExamples";
import JsonResponse from "responses/jsonResponse";
import ErrorResponse from "responses/errorResponse";

const genres = Object.values(AnimeGenreEnum);
const statuses = Object.values(AnimeStatusEnum);
const types = Object.values(AnimeTypeEnum);
const orders = Object.values(FilterOrderEnum);

export class searchByFilter extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Search"],
    summary: "Busca y devuelve un objeto usando filtros.",
    requestBody: {
      types: new Arr(String, {
        description: `Tipos de Anime. [${types.join(", ")}]`,
        required: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        example: types
      }),
      genres: new Arr(String, {
        description: `Hasta un máximo de 4 géneros de anime. [${genres.join(", ")}]`,
        required: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        example: genres.slice(0, 4)
      }),
      statuses: new Arr(Number, {
        description: `Id del estado actual del Anime. [${statuses.join(", ")}] que respectivamente indican [${AnimeStatuses.join(", ")}]`,
        required: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        example: statuses
      })
    },
    parameters: {
      order: Query(String, {
        name: "order",
        description: `Valor para ordenar los resultados. (${orders.join(", ")})`,
        required: false,
      })
    },
    responses: {
      "200": {
        description: "El objeto tiene varios atributos, incluyendo \"previousPage\" y \"nextPage\", que indican si hay más páginas de resultados disponibles antes o después de la página actual. El atributo \"foundPages\" indica cuántas páginas de resultados se encontraron en total. El atributo \"data\" es un arreglo que contiene objetos con información detallada sobre cada anime encontrado. Cada objeto contiene información como el título, la portada, el sinopsis, la calificación, el id, el tipo y la url del anime.",
        schema: {
          success: Boolean,
          search: ExampleSearchByFilter
        },
      },
      "404": {
        description: "No se han encontrado resultados en la búsqueda",
        schema: {
          success: Boolean,
          error: String,
        },
      },
      "400": {
        description: "Bad Request",
        schema: {
          success: Boolean,
          error: String,
        },
      },
    },
  };

  async handle(req: Request, env: any, ctx: any, data: Record<string, any>) {
    console.log(data);
    const { body } = data as Record<string, any>;
    const { order } = data.query;
    console.log(order);
    console.log(body);
    const invalid_order = !orders?.includes(order);
    if (order && invalid_order)
      return new ErrorResponse(400, { success: false, error: `Orden no válido: ${order}`, hint: orders });

    const invalid_types = body?.types?.filter((t: string) => !types?.includes(t));
    if (invalid_types?.length)
      return new ErrorResponse(400, { success: false, error: `Tipos no válidos: ${invalid_types?.join(", ")}`, hint: types });

    const invalid_genres = body?.genres?.filter((g: string) => !genres?.includes(g));
    if (invalid_genres?.length)
      return new ErrorResponse(400, { success: false, error: `Géneros no válido: ${invalid_genres?.join(", ")}`, hint: genres });

    const invalid_statuses = body?.statuses?.filter((s: number) => !statuses?.includes(s));
    if (invalid_statuses?.length)
      return new ErrorResponse(400, { success: false, error: `Estados no válidos: ${invalid_statuses?.join(", ")}`, hint: AnimeStatusEnum });

    if (body?.genres?.length > 4)
      return new ErrorResponse(400, { success: false, error: "Solo se permite máximo 4 géneros." });

    const search = await searchAnimesByFilter({ ...body, order: order });
    return new JsonResponse({
      success: true,
      search
    });
  }
}