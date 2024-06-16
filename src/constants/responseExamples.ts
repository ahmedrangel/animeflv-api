import type { AnimeData, AnimeGenre, AnimeOnAirData, AnimeStatus, AnimeType, ChapterData, PartialAnimeData, SearchAnimeResults } from "types";

export const ExampleSearch: SearchAnimeResults = {
  previousPage: null,
  nextPage: null,
  foundPages: 1,
  data: [
    {
      title: "Overlord II",
      cover: "https://animeflv.net/uploads/animes/covers/2856.jpg",
      synopsis: "Segunda temporada de Overlord.",
      rating: "4.7",
      slug: "overlord-ii",
      type: "Anime" as AnimeType,
      url: "https://www3.animeflv.net/anime/overlord-ii"
    },
    {
      title: "Overlord IV",
      cover: "https://animeflv.net/uploads/animes/covers/3641.jpg",
      synopsis: "Cuarta temporada de Overlord",
      rating: "4.8",
      slug: "overlord-iv",
      type: "Anime" as AnimeType,
      url: "https://www3.animeflv.net/anime/overlord-iv"
    },
    {
      title: "Overlord",
      cover: "https://animeflv.net/uploads/animes/covers/2105.jpg",
      synopsis: "La historia da comienzo cuando Yggdrasil, un popular juego online, es cerrado un día sin previo aviso. Sin embargo, el protagonista, Momonga, decide no salir del juego. Momonga así se transforma y se convierte en “el mago más poderoso”. El mundo sigue cambiando con él dentro, y los NPCs comienzan a sentir emo...",
      rating: "4.8",
      slug: "overlord",
      type: "Anime" as AnimeType,
      url: "https://www3.animeflv.net/anime/overlord"
    },
    {
      title: "Overlord Specials",
      cover: "https://animeflv.net/uploads/animes/covers/2152.jpg",
      synopsis: "Especiales",
      rating: "4.7",
      slug: "overlord-specials",
      type: "OVA" as AnimeType,
      url: "https://www3.animeflv.net/anime/overlord-specials"
    },
    {
      title: "Overlord III",
      cover: "https://animeflv.net/uploads/animes/covers/2991.jpg",
      synopsis: "Tercera temporada de Overlord.",
      rating: "4.7",
      slug: "overlord-iii",
      type: "Anime" as AnimeType,
      url: "https://www3.animeflv.net/anime/overlord-iii"
    }
  ] as PartialAnimeData[]
};

export const ExampleInfo: AnimeData = {
  title: "Overlord",
  alternative_titles: ["Overlord"],
  status: "Finalizado" as AnimeStatus,
  rating: "4.8",
  type: "Anime" as AnimeType,
  cover: "https://animeflv.net/uploads/animes/covers/2105.jpg",
  synopsis: "La historia da comienzo cuando Yggdrasil, un popular juego online, es cerrado un día sin previo aviso. Sin embargo, el protagonista, Momonga, decide no salir del juego. Momonga así se transforma y se convierte en “el mago más poderoso”. El mundo sigue cambiando con él dentro, y los NPCs comienzan a sentir emociones. Sin familia, amigos ni lugar en la sociedad, Momonga tendrá que luchar por adaptarse al nuevo mundo en el que se ha convertido el juego.",
  genres: [
    "Acción",
    "Aventuras",
    "Fantasía",
    "Juegos",
    "Magia",
    "Sobrenatural"
  ] as AnimeGenre[],
  episodes: 13,
  url: "https://www3.animeflv.net/anime/overlord"
};

export const ExampleOnAir: AnimeOnAirData[] = [
  {
    title: "One Piece Anime",
    type: "Anime" as AnimeType,
    slug: "one-piece-tv",
    url: "https://www3.animeflv.net/anime/one-piece-tv"
  },
  {
    title: "Detective Conan Anime",
    type: "Anime" as AnimeType,
    slug: "detective-conan",
    url: "https://www3.animeflv.net/anime/detective-conan"
  },
  {
    title: "Shadowverse Flame Anime",
    type: "Anime" as AnimeType,
    slug: "shadowverse-flame",
    url: "https://www3.animeflv.net/anime/shadowverse-flame"
  },
  {
    title: "Urusei Yatsura (2022) Anime",
    type: "Anime" as AnimeType,
    slug: "urusei-yatsura-2022",
    url: "https://www3.animeflv.net/anime/urusei-yatsura-2022"
  },
  {
    title: "Nijiyon Animation Anime",
    type: "Anime" as AnimeType,
    slug: "nijiyon-animation",
    url: "https://www3.animeflv.net/anime/nijiyon-animation"
  },
  {
    title: "Maou Gakuin no Futekigousha II Anime",
    type: "Anime" as AnimeType,
    slug: "maou-gakuin-no-futekigousha-ii",
    url: "https://www3.animeflv.net/anime/maou-gakuin-no-futekigousha-ii"
  },
  {
    title: "Mushoku Tensei II: Isekai Ittara Honki Dasu Anime",
    type: "Anime" as AnimeType,
    slug: "mushoku-tensei-ii-isekai-ittara-honki-dasu",
    url: "https://www3.animeflv.net/anime/mushoku-tensei-ii-isekai-ittara-honki-dasu"
  }
];

export const ExampleLatest: ChapterData[] = [
  {
    title: "Shadowverse Flame",
    chapter: 85,
    cover: "https://animeflv.net/uploads/animes/thumbs/3590.jpg",
    url: "https://www3.animeflv.net/ver/shadowverse-flame-85"
  },
  {
    title: "Highspeed Etoile",
    chapter: 11,
    cover: "https://animeflv.net/uploads/animes/thumbs/3968.jpg",
    url: "https://www3.animeflv.net/ver/highspeed-etoile-11"
  },
  {
    title: "The iDOLM@STER Shiny Colors",
    chapter: 11,
    cover: "https://animeflv.net/uploads/animes/thumbs/3990.jpg",
    url: "https://www3.animeflv.net/ver/the-idolmster-shiny-colors-11"
  },
  {
    title: "Maou Gakuin no Futekigousha II",
    chapter: 21,
    cover: "https://animeflv.net/uploads/animes/thumbs/3739.jpg",
    url: "https://www3.animeflv.net/ver/maou-gakuin-no-futekigousha-ii-21"
  },
  {
    title: "Mahouka Koukou no Rettousei 3rd Season",
    chapter: 11,
    cover: "https://animeflv.net/uploads/animes/thumbs/3967.jpg",
    url: "https://www3.animeflv.net/ver/mahouka-koukou-no-rettousei-3rd-season-11"
  },
  {
    title: "Tensei shitara Slime Datta Ken 3rd Season",
    chapter: 11,
    cover: "https://animeflv.net/uploads/animes/thumbs/3966.jpg",
    url: "https://www3.animeflv.net/ver/tensei-shitara-slime-datta-ken-3rd-season-11"
  },
  {
    title: "Astro Note",
    chapter: 11,
    cover: "https://animeflv.net/uploads/animes/thumbs/3965.jpg",
    url: "https://www3.animeflv.net/ver/astro-note-11"
  },
];

export const ExampleSearchByFilter: SearchAnimeResults = {
  "previousPage": null,
  "nextPage": "https://www3.animeflv.net/browse?genre%5B%5D=shounen&status%5B%5D=2&type%5B%5D=tv&order=default&page=2",
  "foundPages": 24,
  "data": [
    {
      "title": "One Room, Hiatari Futsuu, Tenshi-tsuki.",
      "cover": "https://animeflv.net/uploads/animes/covers/3952.jpg",
      "synopsis": "Luego de un largo día, los planes del estudiante de preparatoria Shintaro Tokumitsu para relajarse en su estudio se complican cuando descubre un ángel en su balcón. La chica divina, Towa, le revela que su propósito es estudiar a la humanidad y, a pesar de su escepticismo, él accede a hospedarla. Prepárate para la historia de convivencia más ...",
      "rating": "4.2",
      "slug": "one-room-hiatari-futsuu-tenshitsuki",
      "type": "Anime",
      "url": "https://www3.animeflv.net/anime/one-room-hiatari-futsuu-tenshitsuki"
    },
    {
      "title": "Sengoku Youko",
      "cover": "https://animeflv.net/uploads/animes/covers/3941.jpg",
      "synopsis": "Los humanos y lo katawara están en guerra, pero en ambos bandos hay quienes deciden unir fuerzas. Tama es un espíritu zorro que adora a los humanos, mientras que su hermano jurado Jinka, un sabio, los odia. Juntos usarán el poder de la transformación espiritual para derrotar a los monstruos katawara y poner fin a las maldades de esta era de bar...",
      "rating": "4.0",
      "slug": "sengoku-youko",
      "type": "Anime",
      "url": "https://www3.animeflv.net/anime/sengoku-youko"
    },
    {
      "title": "Himesama \"Goumon\" no Jikan desu",
      "cover": "https://animeflv.net/uploads/animes/covers/3936.jpg",
      "synopsis": "Cuando la guerra entre el Ejército Imperial y los Infernales hace estragos, la princesa, a pesar de ir armada con su mítica espada Excalibur, es capturada y aprisionada. ¿A qué clase de tortura tendrá que hacer frente a manos de la interrogadora principal de los demonios? ¡Tostadas recién hechas! ¡Ramen calentito y humeante! ¡Ay, la humani...",
      "rating": "3.9",
      "slug": "himesama-goumon-no-jikan-desu",
      "type": "Anime",
      "url": "https://www3.animeflv.net/anime/himesama-goumon-no-jikan-desu"
    },
    {
      "title": "Ao no Exorcist: Shimane Illuminati-hen",
      "cover": "https://animeflv.net/uploads/animes/covers/3929.jpg",
      "synopsis": "Tercera temporada de Ao no Exorcist",
      "rating": "4.5",
      "slug": "ao-no-exorcist-shimane-illuminatihen",
      "type": "Anime",
      "url": "https://www3.animeflv.net/anime/ao-no-exorcist-shimane-illuminatihen"
    },
    {
      "title": "Mato Seihei no Slave",
      "cover": "https://animeflv.net/uploads/animes/covers/3920.jpg",
      "synopsis": "Cuando las entradas a una dimensión diferente conocida como el “Mato” surgen por todo Japón, se descubre un nuevo recurso conocido como “Duraznos\" que otorga habilidades únicas solo a las mujeres. Sin embargo, unos peligrosos monstruos llamados “Yomotsu Shuuki” también rondan por Mato y son responsables de varios desastres desde enton...",
      "rating": "4.3",
      "slug": "mato-seihei-no-slave",
      "type": "Anime",
      "url": "https://www3.animeflv.net/anime/mato-seihei-no-slave"
    },
    {
      "title": "Undead Unluck",
      "cover": "https://animeflv.net/uploads/animes/covers/3891.jpg",
      "synopsis": "Tras leer la conclusión de su serie de manga favorita, Fuuko Izumo se siente finalmente preparada para poner fin a su existencia. Durante los últimos 10 años, Fuuko se ha visto afectada por una condición que trae consigo una desgracia extrema para cualquiera que la toque. Esto ha tenido un efecto drástico en su entorno, e incluso ha provocado ...",
      "rating": "4.6",
      "slug": "undead-unluck",
      "type": "Anime",
      "url": "https://www3.animeflv.net/anime/undead-unluck"
    },
    {
      "title": "Shy",
      "cover": "https://animeflv.net/uploads/animes/covers/3870.jpg",
      "synopsis": "Estando el mundo al borde de una tercera Guerra Mundial, surgieron superhéroes. Dotados de poderes extraordinarios, su aparición marcó el inicio de una era de paz global. Cada héroe escogió un país para habitar, proteger y servir a sus ciudadanos. Shy es la heroína de Japón, dotada de una fuerza sobrehumana. ¿Su mayor adversario? Su propia...",
      "rating": "3.9",
      "slug": "shy",
      "type": "Anime",
      "url": "https://www3.animeflv.net/anime/shy"
    }
  ]
};