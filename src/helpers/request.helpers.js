import merge from 'deepmerge';

export const authFetch = (url, options) => {
  return fetch(
    url,
    merge(options, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }),
  );
};

export const authFetchJson = async (url, options) =>
  (await authFetch(url, options)).json();

export const authFetchText = async (url, options) =>
  (await authFetch(url, options)).text();
