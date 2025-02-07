import { ApiNames } from '../constants/ApiNames';
import { postRequest } from './NetworkServices';
import { ICarePoiletData } from '../@types/CommonTypes';
import { IPostCarePoiletResponse } from '../@types/ApiResponses';

export const postCarePioletService = async (data: ICarePoiletData) => {
  const { data: response }: { data: IPostCarePoiletResponse } =
    await postRequest(ApiNames.postCarePoilet, data);
  return response;
};
