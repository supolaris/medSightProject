import { microsoftBaseUrl } from './Config';

export const microsoftLoginService = async (accessToken: string) => {
  let userInfoResp = await fetch(microsoftBaseUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let userInfo = await userInfoResp.json();
  return userInfo;
};
