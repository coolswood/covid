import axios, {Method} from 'axios';

export const ApiRequest = <R, T>(
    url: string,
    data: T,
    method: Method = 'POST'
): Promise<R> => {
    return axios({
        url: `/api/${url}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        method,
        data,
    }).then(({data}) => data);
};
