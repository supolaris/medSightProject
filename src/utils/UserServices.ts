import { IGetUserProfileResponse } from '../@types/ApiResponses';
import { ApiNames } from '../constants/ApiNames';
import { postWithoutDataRequest } from './NetworkServices';

export const getUserProfileService = async () => {
  const { data: response }: { data: IGetUserProfileResponse } =
    await postWithoutDataRequest(ApiNames.getUserProfile);
  return response;
};
