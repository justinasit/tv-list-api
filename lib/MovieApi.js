import * as Tmdb from './Tmdb.js';

export async function searchTv(term) {
  return await Tmdb.searchTv(term);
}

export async function getInfoById(id) {
  return await Tmdb.getInfoById(id);
}

/* Map show data from the API to our shows object */
export function mapApiDataToObject(apiData, showIdIndex, note) {
  return Tmdb.mapApiDataToObject(apiData, showIdIndex, note);
}

export function hasSeasons(apiData) {
  return Tmdb.hasSeasons(apiData);
}
