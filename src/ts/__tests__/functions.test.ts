import { movieSort } from '../functions';
import { moviesMock } from '../__mocks__/moviesMock';
import { IMovie } from '../models/Movie';

describe('#Sort function', () => {
  let movies: IMovie[];
  let descTrue: boolean;
  let descFalse: boolean;
  beforeEach(() => {
    descTrue = true;
    descFalse = false;
    movies = [...moviesMock];
  });

  test('movies should be sorted by titles in descending order', () => {
    movieSort(movies, descTrue);
    expect(movies.map((movie) => movie.Title)).toEqual([
      'Alien',
      'Batman',
      'Batman',
      'Cabin Fever',
    ]);
  });

  test('movies should be sorted by titles in ascending order', () => {
    movieSort(movies, descFalse);
    expect(movies.map((movie) => movie.Title)).toEqual([
      'Cabin Fever',
      'Batman',
      'Batman',
      'Alien',
    ]);
  });

  test('if desc is not provided, default value is true', () => {
    movieSort(movies);
    expect(movies.map((movie) => movie.Title)).toEqual([
      'Alien',
      'Batman',
      'Batman',
      'Cabin Fever',
    ]);
  });

  test('movies with equal title should maintain order', () => {
    movieSort(movies, descFalse);
    expect(movies[1].imdbID).toEqual('2');
    expect(movies[2].imdbID).toEqual('4');
  });
});
