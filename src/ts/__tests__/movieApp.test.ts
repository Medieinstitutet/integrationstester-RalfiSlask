import { init } from '../movieApp';
import * as functions from '../submitFunctions';

describe('#init', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div id="app">
          <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
          </form>
          <div id="movie-container"></div>
        </div>
        `;
  });

  test('submit should trigger handleSubmit function and prevent default', () => {
    const submitSpy = jest.spyOn(functions, 'handleSubmit');
    const form = document.getElementById('searchForm') as HTMLFormElement;

    init();

    const submitEvent = new Event('submit', {
      cancelable: true,
      bubbles: true,
    });
    const preventSpy = jest.fn();
    submitEvent.preventDefault = preventSpy;
    form.dispatchEvent(submitEvent);

    expect(preventSpy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalled();

    submitSpy.mockReset();
  });
});
