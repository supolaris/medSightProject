import {
  IGetMyPatientsResponse,
  IGetPatientDetailsResponse,
} from '../@types/ApiResponses';
import { ApiNames } from '../constants/ApiNames';
import { deleteRequest, getRequest, postRequest } from './NetworkServices';

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

export const addNewPatientService = async (data: any) => {
  // let { data: response }: { data: IGetMyPatientsResponse } = await postRequest(
  //   ApiNames.postPatient,
  //   data,
  // );

  let response = await postRequest(ApiNames.postPatient, data);
  return response;
};

export const getMyPatientDetailsService = async (patientId: string) => {
  let completeEndPoint = `${ApiNames.getPatientDetails}${patientId}`;
  let { data: response }: { data: IGetPatientDetailsResponse } =
    await getRequest(completeEndPoint);
  return response;
};

export const deletePatientService = async (patientId: string) => {
  let completeEndPoint = `${ApiNames.deletePatient}${patientId}`;
  let response = await deleteRequest(completeEndPoint);
  return response;
};
