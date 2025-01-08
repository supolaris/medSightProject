import { IGetMyPatientsResponse } from '../@types/ApiResponses';
import { ApiNames } from '../constants/ApiNames';
import { getRequest } from './NetworkServices';

export const getMyPatientsService = async (pageSize: number) => {
  let completeEndPoint = `${ApiNames.getPatients}?pageSize=${pageSize}`;
  let { data: response }: { data: IGetMyPatientsResponse } = await getRequest(
    completeEndPoint,
  );
  return response;
};

export const getSearchPatientsService = async (searchedPatient: string) => {
  let completeEndPoint = `${ApiNames.getPatients}?searchTerm=${searchedPatient}`;
  let { data: response }: { data: IGetMyPatientsResponse } = await getRequest(
    completeEndPoint,
  );
  return response;
};
