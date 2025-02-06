import { getRequest } from './NetworkServices';
import { ApiNames } from '../constants/ApiNames';
import { IGetUserProfileResponse } from '../@types/ApiResponses';

export const getUserProfileService = async () => {
  const { data: response }: { data: IGetUserProfileResponse } =
    await getRequest(ApiNames.getUserProfile);
  return response;
};
