/* eslint-disable no-console */
import isObject from 'lodash/isObject';
import Reactotron from 'reactotron-react-js';
import blobToFile from '../../utils/fileUtils/blobToFile';

export interface FetchServiceParams {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  blob?: boolean;
  withCredentials?: boolean;
  headers?: {
    [x: string]: string | boolean;
  };
  params?: any;
  data?:
    | {
        [x: string]: any;
      }
    | FormData;
}

async function fetchCore<T = unknown>({
  url,
  method = 'GET',
  withCredentials = true,
  headers,
  params,
  data,
  blob = false
}: FetchServiceParams): Promise<T> {
  try {
    const session = JSON.parse(sessionStorage.getItem('session'));
    const sessionOld = JSON.parse(sessionStorage.getItem('AuthContext'));
    const fetchConfig: RequestInit = {
      method,
      credentials: withCredentials ? 'include' : 'same-origin', // withCredentials
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${session?.access_token || sessionOld?.session?.accessToken}`
      }
    };

    if (data) {
      if (!isObject(data)) {
        fetchConfig.body = data;
      } else if (data instanceof FormData) {
        fetchConfig.body = data;
        // It needs to delete content type so the browser automatically can set it and its boundary
        Object.keys(fetchConfig.headers).forEach(key => {
          if (String(key).toLowerCase() === 'content-type') {
            delete fetchConfig.headers[key];
          }
        });
      } else {
        fetchConfig.body = JSON.stringify(data);
      }
    }

    let urlWithParams = url;
    if (params) {
      urlWithParams += `?${Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')}`;
    }

    const result = await fetch(urlWithParams, fetchConfig)
      .then(async response => {
        // eslint-disable-next-line no-shadow
        const data: string | Blob = blob ? await response?.blob() : await response.text();

        // eslint-disable-next-line no-shadow
        let result: any = {};
        try {
          if (!(data instanceof Blob)) {
            result = JSON.parse(data);
          } else {
            const fileName = response.headers.get('filename');
            result = fileName ? blobToFile(data, fileName) : data; // Blob or File
          }
        } catch {
          result = {};
        }
        if (response.ok) {
          return result;
        }
        throw result;
      })
      .catch(e => {
        Reactotron.error(`An error ocurred in @santander/debt-consult, was in fetchCore: ${url}`, e);
        return Promise.reject(e);
      });

    return result;
  } catch (e) {
    Reactotron.error(`An error ocurred in @santander/debt-consult, was in fetchCore: ${url}`, e);
    return Promise.reject(e);
  }
}

export default fetchCore;
