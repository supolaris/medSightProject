import { ApiNames } from '../constants/ApiNames';
import { getRequest } from './NetworkServices';

export const getPreviousNotesService = async (patientId: string) => {
  const completeEndpoint = `${ApiNames.getMecialHistory}${patientId}`;
  const { data: response }: { data: any } = await getRequest(completeEndpoint);
  return response;
};
