import axios from 'axios';
import { baseUrl, requestTimeout } from './Config';

export const getRequest = async (endPoint: string) => {
  console.log('Api endpoint', baseUrl + endPoint);
  let _baseUrl = baseUrl;
  const response = await axios({
    url: `${_baseUrl}${endPoint}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'close',
      Authorization: 'Bearer ' + global.token,
    },
    timeout: requestTimeout,
  });

  return response;
};

export const postRequest = async (endPoint: string, data: any) => {
  console.log('URL', baseUrl + endPoint);
  const response = await axios({
    url: `${baseUrl}${endPoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'close',
      Authorization: 'Bearer ' + global.token,
    },
    data: data,
    timeout: requestTimeout,
  });

  return response;
};
