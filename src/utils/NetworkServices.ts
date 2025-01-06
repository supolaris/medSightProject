import axios from 'axios';
import { baseUrl, CLIENT_ID, requestTimeout } from './Config';

// export const getRequest = async (endPoint: string) => {
//   console.log('Api endpoint', baseUrl + endPoint);
//   console.log('get global.token', global.token);
//   let _baseUrl = baseUrl;
//   const response = await axios({
//     url: `${_baseUrl}${endPoint}`,
//     method: 'get',
//     headers: {
//       Authorization: `Bearer ${global.token}`,
//     },
//     // timeout: requestTimeout,
//   });

//   return response;
// };

export const getRequest = async (endPoint: string) => {
  console.log('Api endpoint', baseUrl + endPoint);
  console.log('get global.token', global.token);
  let _baseUrl = baseUrl;
  const response = await axios({
    url: `${_baseUrl}${endPoint}`,
    method: 'get',
    headers: {
      'Client-ID': '425036b3-c61f-49ac-9f22-7a643e1def26',
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': '125',
      Date: new Date().toUTCString(),
      Server: 'Kestrel',
      // 'Content-Type': 'application/json',
      // Connection: 'close',
      // Authorization: 'Bearer ' + global.token,
    },
    // timeout: requestTimeout,
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
