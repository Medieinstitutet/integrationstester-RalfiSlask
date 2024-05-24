import { getData } from './services/movieService';
import { createHtml, displayNoResult } from './htmlFunctions';
import { IMovie } from './models/Movie';

let movies: IMovie[] = [];

export async function handleSubmit() {
  let searchText = (document.getElementById('searchText') as HTMLInputElement)
    .value;

  let container: HTMLDivElement = document.getElementById(
    'movie-container'
  ) as HTMLDivElement;
  container.innerHTML = '';

  try {
    movies = await getData(searchText);

    if (movies.length > 0) {
      createHtml(movies, container);
    } else {
      displayNoResult(container);
    }
  } catch {
    displayNoResult(container);
  }
}
