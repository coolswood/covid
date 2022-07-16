import axios, { Method } from 'axios';

export const ApiRequest = <R, T>(
  url: string,
  data: T,
  method: Method = 'GET'
): Promise<R> => {
  return axios({
    url: `/api/${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    method,
    params: method === 'GET' ? data : undefined,
    data: method === 'POST' ? data : undefined,
  }).then(({ data }) => data);
};
