import { moviesMock } from '../__mocks__/moviesMock';
import axios from 'axios';
import { getData } from '../services/movieService';

describe('#getData', () => {
  let searchText: string;
  let mockedAxiosSpy: jest.SpyInstance<Promise<unknown>>;
  beforeEach(() => {
    searchText = 'Harry Potter';
    mockedAxiosSpy = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    mockedAxiosSpy.mockReset();
  });

  test('should return movies data on resolve', async () => {
    mockedAxiosSpy.mockResolvedValue({
      data: {
        Search: moviesMock,
      },
    });

    const movies = await getData(searchText);
    expect(mockedAxiosSpy).toHaveBeenCalled();
    expect(movies).toHaveLength(moviesMock.length);
    expect(movies[0].Title).toBe('Alien');
  });

  test('should call correct url', async () => {
    mockedAxiosSpy.mockResolvedValue({
      data: {
        Search: moviesMock,
      },
    });

    await getData(searchText);
    expect(mockedAxiosSpy).toHaveBeenCalledWith(
      `http://omdbapi.com/?apikey=416ed51a&s=${searchText}`
    );
  });

  test('should return undefined if Search key is missing', async () => {
    mockedAxiosSpy.mockResolvedValue({
      data: {},
    });
    const movies = await getData(searchText);

    expect(mockedAxiosSpy).toHaveBeenCalled();
    expect(movies).toBeUndefined();
  });

  test('should handle API error', async () => {
    mockedAxiosSpy.mockRejectedValue(new Error('Error fetching data'));

    const movies = await getData(searchText);

    expect(mockedAxiosSpy).toHaveBeenCalled();
    expect(movies).toEqual([]);
    expect(movies).toHaveLength(0);
  });
});
