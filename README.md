# Unofficial AnimeFLV REST API

### Base URL
https://animeflv.ahmedrangel.com/api

## Endpoints
### Anime
`GET` [/anime/{slug}](https://animeflv.ahmedrangel.com/#/Anime/get_info)

`GET` [/anime/episode/{slug}](https://animeflv.ahmedrangel.com/#/Anime/get_episode)

`GET` [/anime/{slug}/episode/{number}](https://animeflv.ahmedrangel.com/#/Anime/get_episodeByAnimeSlugAndEpisodeNumber)


### Search
`GET` [/search](https://animeflv.ahmedrangel.com/#/Search/get_search)

`POST` [/search/by-filter](https://animeflv.ahmedrangel.com/#/Search/post_searchByFilter)

`GET` [/search/by-url](https://animeflv.ahmedrangel.com/#/Search/get_searchByUrl)

### List
`GET` [/list/latest-episodes](https://animeflv.ahmedrangel.com/#/List/get_latest)

`GET` [/list/animes-on-air](https://animeflv.ahmedrangel.com/#/List/get_onAir)