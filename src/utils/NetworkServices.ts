import axios from 'axios';
import { apiClientId, baseUrl, bearerToken, requestTimeout } from './Config';

export const getRequest = async (endPoint: string) => {
  console.log('Api endpoint', baseUrl + endPoint);
  // console.log('get global.token', global.token);
  let _baseUrl = baseUrl;
  const response = await axios({
    url: `${_baseUrl}${endPoint}`,
    method: 'get',
    headers: {
      client_id: apiClientId,
      Authorization: `Bearer ${bearerToken}`,
    },
    timeout: requestTimeout,
  });

  return response;
};

export const postRequest = async (endPoint: string, data: any) => {
  console.log('URL', baseUrl + endPoint);
  console.log('post global.token', global.token);
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
