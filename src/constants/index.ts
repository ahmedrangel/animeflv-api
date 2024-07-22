export const AnimeflvUrls = {
  host: "https://www3.animeflv.net",
  images: "https://animeflv.net"
};

export const AnimeGenres = [
  "Acción", "Artes Marciales", "Aventuras", "Carreras", "Ciencia Ficción", "Comedia", "Demencia", "Demonios", "Deportes", "Drama", "Ecchi", "Escolares", "Espacial", "Fantasía", "Harem", "Histórico", "Infantil", "Josei", "Juegos", "Magia", "Mecha", "Militar", "Misterio", "Música", "Parodia", "Policía", "Psicológico", "Recuentos de la vida", "Romance", "Samurai", "Seinen", "Shoujo", "Shounen", "Sobrenatural", "Superpoderes", "Suspenso", "Terror", "Vampiros", "Yaoi", "Yuri"
] as const;

export const AnimeStatuses = ["En emision", "Finalizado", "Proximamente"] as const;
export const AnimeTypes = ["OVA", "Anime", "Película", "Especial"] as const;
export const FilterOrderTypes = ["default", "updated", "added", "title", "rating"] as const;

export const FilterOrderEnum = {
  "Por Defecto": "default",
  "Recientemente Actualizados": "updated",
  "Recientemente Agregados": "added",
  "Nombre A-Z": "title",
  "Calificacion": "rating"
};

export const AnimeTypeEnum = {
  Anime: "tv",
  Película: "movie",
  Especial: "special",
  OVA: "ova"
};

export const AnimeStatusEnum = {
  "En emision": 1,
  "Finalizado": 2,
  "Proximamente": 3
};

export const AnimeGenreEnum = {
  "Acción": "accion",
  "Artes Marciales": "artes-marciales",
  "Aventuras": "aventura",
  "Carreras": "carreras",
  "Ciencia Ficción": "ciencia-ficcion",
  "Comedia": "comedia",
  "Demencia": "demencia",
  "Demonios": "demonios",
  "Deportes": "deportes",
  "Drama": "drama",
  "Ecchi": "ecchi",
  "Escolares": "escolares",
  "Espacial": "espacial",
  "Fantasía": "fantasia",
  "Harem": "harem",
  "Histórico": "historico",
  "Infantil": "infantil",
  "Josei": "josei",
  "Juegos": "juegos",
  "Magia": "magia",
  "Mecha": "mecha",
  "Militar": "militar",
  "Misterio": "misterio",
  "Música": "musica",
  "Parodia": "parodia",
  "Policía": "policia",
  "Psicológico": "psicologico",
  "Recuentos de la vida": "recuentos-de-la-vida",
  "Romance": "romance",
  "Samurai": "samurai",
  "Seinen": "seinen",
  "Shoujo": "shoujo",
  "Shounen": "shounen",
  "Sobrenatural": "sobrenatural",
  "Superpoderes": "superpoderes",
  "Suspenso": "suspenso",
  "Terror": "terror",
  "Vampiros": "vampiros",
  "Yaoi": "yaoi",
  "Yuri": "yuri"
};