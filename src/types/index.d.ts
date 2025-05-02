import type { AnimeGenres, AnimeStatuses, AnimeTypes, FilterOrderTypes } from "../constants";

export type AnimeStatus = typeof AnimeStatuses[number];
export type AnimeType = typeof AnimeTypes[number];
export type AnimeGenre = typeof AnimeGenres[number];
export type FilterOrderType = typeof FilterOrderTypes[number];

export interface PartialAnimeData {
  /** Título del animé */
  title: string;
  /** URL de la carátula del animé */
  cover: string;
  /** La sinopsis (descripción) del animé */
  synopsis: string;
  /** Evaluación de estrellas del animé */
  rating: string;
  /** Slug del animé */
  slug: string;
  /** El tipo de anime: OVA | Anime | Película | Especial */
  type: AnimeType;
  /** La URL directa a la página de éste animé */
  url: string;
}

export interface SearchAnimeResults {
  /** Página actual */
  currentPage: number;
  /** URL a la página anterior, o null en caso de no haber*/
  previousPage: string | null;
  /** URL a la página siguiente, o null en caso de no haber*/
  nextPage: string | null;
  /** Indica si hay una página siguiente o no */
  hasNextPage: boolean;
  /** Número de páginas con resultados de la búsqueda realizada */
  foundPages: number;
  /** Los animés encontrados en la búsqueda */
  media: PartialAnimeData[];
}

export interface AnimeInfoData {
  /** Titulo del animé */
  title: string;
  /** Array con titulos alternativos de este animé */
  alternative_titles: string[];
  /** Estado de este animé: "En emision" | "Finalizado" | "Proximamente" */
  status: AnimeStatus;
  /** Evaluación de estrellas de este animé */
  rating: string;
  /** El tipo de anime: "OVA" | "Anime" | "Película" | "Especial" */
  type: AnimeType;
  /** URL a la carátula de este animé */
  cover: string;
  /** Sinopsis o descripción del animé */
  synopsis: string;
  /** Array con los géneros (etiquetas) del anime */
  genres: AnimeGenre[];
  /** Fecha del próximo episodio en emisión (YYYY-MM-DD) */
  next_airing_episode?: string;
  /** Número de episodios que tiene este animé */
  episodes: EpisodeData[] | number;
  /** Lista de animés relacionados */
  related?: AnimeRelated[];
  /** La URL directa a la pagina del animé */
  url: string;
}

/** Relación de animés (precuela, secuela, etc.) */
export interface AnimeRelated {
  /** Título del animé relacionado */
  title: string;
  /** Tipo de relación (Precuela, Secuela, etc.) */
  relation?: string;
  /** El slug de este animé */
  slug: string;
  /** URL completa al anime relacionado */
  url: string;
}

export interface EpisodeData {
  /** Número del episodio */
  number: number;
  /** Slug del episodio */
  slug: string;
  /** Link del episodio */
  url: string;
}

export interface ChapterData {
  /** Título del episodio */
  title: string;
  /** Número del episodio */
  number: number;
  /** URL del thumbnail de este episodio */
  cover: string;
  /** URL directa del episodio */
  url: string;
}

export interface AnimeOnAirData {
  /** Título del animé */
  title: string;
  /** El tipo de anime: "OVA" | "Anime" | "Película" | "Especial" */
  type: AnimeType;
  /** El slug de este animé */
  slug: string;
  /** La URL directa a la página de este anime */
  url: string;
}
export interface FilterOptions {
  /** Lista de generos para la búsqueda */
  genres?: AnimeGenre[];
  /** Lista de tipos para la búsqueda */
  types?: AnimeType[];
  /** Los statuses de los animés para filtrar */
  statuses?: AnimeStatus[];
  /** El orden en el que se recibirán los animés */
  order?: FilterOrderType;
  /** El número de página que se solicitará */
  page?: number;
}

export interface EpisodeServersData {
  /** Nombre del servidor */
  name: string;
  /** URL del servidor para descarga de episodio */
  download?: string;
  /** URL del servidor para embed del episodio */
  embed?: string;
}

export interface EpisodeInfoData {
  title: string;
  number: number;
  servers: EpisodeServersData[];
}

interface SeoOptions {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

interface ColorCustomizationOptions {
  text?: string;
  bg?: string;
  sectionHeaderBg?: string;
  sectionHeaderText?: string;
  get?: string;
  post?: string;
  delete?: string;
  codeBg?: string;
}

export interface CustomSwaggerUIOptionsTypes {
  title?: string;
  description?: string;
  defaultColorMode?: "dark" | "light";
  colors?: {
    dark?: ColorCustomizationOptions;
    light?: ColorCustomizationOptions;
  };
  showServers?: boolean;
  seo?: SeoOptions;
}