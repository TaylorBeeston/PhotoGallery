import merge from 'deepmerge';

export const authFetch: typeof fetch = (url, options) => {
  return fetch(
    url,
    merge<RequestInit | undefined>(options, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }),
  );
};

export const authFetchJson = async <T>(
  url: RequestInfo,
  options?: RequestInit,
): Promise<T> => (await authFetch(url, options)).json();

export const authFetchText = async (
  url: RequestInfo,
  options?: RequestInit,
): Promise<string> => (await authFetch(url, options)).text();
