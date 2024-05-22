import { handleSubmit } from './submitFunctions';

export const init = () => {
  let form = document.getElementById('searchForm') as HTMLFormElement;
  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    handleSubmit();
  });
};
