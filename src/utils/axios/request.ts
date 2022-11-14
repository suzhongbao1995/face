import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
interface Config extends AxiosRequestConfig {
  data?: any;
  withCredentials?: boolean;
}

function request<T>(config: Config) {
  // TODO: 配置业务需要
  const { method = 'get', url, data = {}, withCredentials = false } = config;
  let options: Config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials,
    ...config,
  };
  if (method.toLowerCase() === 'get') {
    options.url = `${url}?${stringify(data)}`;
  }
  axios.request<T>(options).then((response) => {
    if (response) {
      return response.data;
    }
    return Promise.reject(response);
  });
}
export function get<T>(params: Omit<Config, 'method'>) {
  return request<T>({ method: 'get', ...params });
}
export function post<T>(params: Omit<Config, 'method'>) {
  return request<T>({ method: 'post', ...params });
}
