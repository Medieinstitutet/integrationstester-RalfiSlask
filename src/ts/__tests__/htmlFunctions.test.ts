/**
 * jest-environment jsdom
 */

import { moviesMock } from '../__mocks__/moviesMock';
import { createHtml, displayNoResult } from '../htmlFunctions';
import { IMovie } from '../models/Movie';

describe('#HTML functions', () => {
  let movies: IMovie[];
  let movieContainer: HTMLDivElement | null;
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="app">
        <form id="searchForm">
          <input type="text" id="searchText" placeholder="Skriv titel här" />
          <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
    </div>`;
    movies = [...moviesMock];
    movieContainer = document.getElementById(
      'movie-container'
    ) as HTMLDivElement | null;
  });

  describe('#createHtml', () => {
    beforeEach(() => {
      if (movieContainer) createHtml(movies, movieContainer);
    });

    test('movie elements should contain the class movie', () => {
      const movieElement = document.querySelector('.movie');

      expect(movieElement?.classList.contains('movie')).toBeTruthy();
    });

    test('innerHTML should be empty if the movie array is empty', () => {
      if (movieContainer) {
        // clearing the movie container content manually, createHTML functions does not do this
        movieContainer.innerHTML = '';
        createHtml([], movieContainer);
        expect(movieContainer?.innerHTML).toBe('');
      }
    });

    test('DOM nodes for movies should be the same length as the movies array', () => {
      expect(movieContainer?.querySelectorAll('.movie')).toHaveLength(
        movies.length
      );
      expect(movieContainer?.querySelectorAll('h3')).toHaveLength(
        movies.length
      );
      expect(movieContainer?.querySelectorAll('img')).toHaveLength(
        movies.length
      );
    });

    test('DOM image should have the same src and alt attributes as the Poster and Title values in movies', () => {
      const imageElements = document.querySelectorAll('img');
      const titleElements = document.querySelectorAll('h3');

      imageElements.forEach((image, index) => {
        expect(image.src.replace('http://localhost', '')).toBe(
          movies[index].Poster
        );
        expect(image.alt).toBe(movies[index].Title);
        expect(titleElements[index].innerHTML).toBe(movies[index].Title);
      });
    });
  });

  describe('#displayNoResult', () => {
    test('should add paragraph and show message "inga sökresultat att visa"', () => {
      if (movieContainer) displayNoResult(movieContainer);
      const messageParagraph = document.querySelector('p');

      expect(messageParagraph?.innerHTML).toBe('Inga sökresultat att visa');
    });
  });
});
