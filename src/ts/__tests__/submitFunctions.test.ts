import { moviesMock } from '../__mocks__/moviesMock';
import * as htmlFunctions from '../htmlFunctions';
import { IMovie } from '../models/Movie';
import { handleSubmit } from '../submitFunctions';
import axios from 'axios';

describe('#submit functions', () => {
  let createHtmlSpy: jest.SpyInstance<void>;
  let displaySpy: jest.SpyInstance<void>;
  let mockedAxiosSpy: jest.SpyInstance<Promise<unknown>>;
  let movieContainer: HTMLDivElement;
  let movies: IMovie[] = [];

  beforeEach(() => {
    movies = [...moviesMock];
    displaySpy = jest.spyOn(htmlFunctions, 'displayNoResult');
    mockedAxiosSpy = jest.spyOn(axios, 'get');
    createHtmlSpy = jest.spyOn(htmlFunctions, 'createHtml');
    document.body.innerHTML = `
    <div id="app">
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
    </div>`;
    movieContainer = document.getElementById(
      'movie-container'
    ) as HTMLDivElement;
    displaySpy.mockImplementation((movieContainer: HTMLDivElement) => {
      movieContainer.innerHTML = '<p>mocked no search results</p>';
    });
  });

  afterEach(() => {
    displaySpy.mockReset();
    mockedAxiosSpy.mockReset();
    createHtmlSpy.mockReset();
  });

  test('if the movies data return an empty array append and show "mocked no search results"', async () => {
    mockedAxiosSpy.mockResolvedValue({
      data: {
        Search: [],
      },
    });

    await handleSubmit();

    expect(displaySpy).toHaveBeenCalledWith(movieContainer);
    expect(createHtmlSpy).not.toHaveBeenCalled();
    expect(movieContainer?.innerHTML).toBe('<p>mocked no search results</p>');
  });

  test('html inside movie-container should be from the moviesMock', async () => {
    mockedAxiosSpy.mockResolvedValue({
      data: {
        Search: movies,
      },
    });

    createHtmlSpy.mockImplementation(
      (movies: IMovie[], movieContainer: HTMLDivElement) => {
        movieContainer.innerHTML = '';
        movies.forEach((movie) => {
          const div = document.createElement('div');
          div.classList.add('movie');
          div.innerHTML = movie.Title;
          movieContainer.append(div);
        });
      }
    );

    await handleSubmit();

    expect(createHtmlSpy).toHaveBeenCalledWith(movies, movieContainer);
    expect(displaySpy).not.toHaveBeenCalled();
    movieContainer.querySelectorAll('.movie').forEach((movieEl, index) => {
      expect(movieEl.classList.contains('movie')).toBeTruthy();
      expect(movieEl.textContent).toBe(movies[index].Title);
    });
  });

  test('rejected try catch should result in message mocked no search result', async () => {
    /*     mockedAxiosSpy.mockRejectedValue(new Error('could not fetch')); */
    mockedAxiosSpy.mockImplementation(() => {
      return Promise.reject('could not fetch');
    });

    await handleSubmit();

    expect(displaySpy).toHaveBeenCalledWith(movieContainer);
    expect(createHtmlSpy).not.toHaveBeenCalled();
    expect(movieContainer?.innerHTML).toBe('<p>mocked no search results</p>');
  });
});
