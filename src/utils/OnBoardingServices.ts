import { IUserDetails } from '../@types/CommonTypes';
import { ApiNames } from '../constants/ApiNames';
import {
  getMicrosoftImageRequest,
  getUserDetailsRequest,
} from './NetworkServices';

export const getUserMicrosoftImage = async () => {
  const response = await getMicrosoftImageRequest(
    ApiNames.getUserMicrosoftImage,
  );

  return response;
};

export const getUserDetailsService = async () => {
  let { data: response }: { data: IUserDetails } =
    await getUserDetailsRequest();

  return response;
};
