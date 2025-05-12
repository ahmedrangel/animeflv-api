export const ExampleSearch = {
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  previousPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  foundPages: z.number(),
  media: [
    {
      title: z.string(),
      cover: z.string(),
      synopsis: z.string(),
      rating: z.string(),
      slug: z.string(),
      type: z.string(),
      url: z.string()
    }
  ]
};

export const ExampleInfo = z.object({
  title: z.string(),
  alternative_titles: z.array(z.string()),
  status: z.string(),
  rating: z.string(),
  type: z.string(),
  cover: z.string(),
  synopsis: z.string(),
  genres: z.array(z.string()),
  next_airing_episode: z.string().optional(),
  episodes: z.array(
    z.object({
      number: z.number(),
      slug: z.string(),
      url: z.string()
    })
  ),
  url: z.string(),
  related: z.array(z.object({ title: z.string(), relation: z.string().optional(), slug: z.string(), url: z.string() })).optional()
});

export const ExampleOnAir = [
  {
    title: z.string(),
    type: z.string(),
    slug: z.string(),
    url: z.string()
  }
];

export const ExampleLatest = [
  {
    title: z.string(),
    number: z.number(),
    cover: z.string(),
    url: z.string()
  }
];

export const ExampleSearchByFilter = {
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  previousPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  foundPages: z.number(),
  media: [
    {
      title: z.string(),
      cover: z.string(),
      synopsis: z.string(),
      rating: z.string(),
      slug: z.string(),
      type: z.string(),
      url: z.string()
    }
  ]
};

export const ExampleEpisodeInfo = z.object({
  title: z.string(),
  number: z.number(),
  servers: z.array(
    z.object({
      name: z.string(),
      download: z.string().optional(),
      embed: z.string().optional()
    })
  )
});
