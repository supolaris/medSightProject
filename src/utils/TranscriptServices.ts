import { IGenerateIntakeNotesResponse } from '../@types/ApiResponses';
import { ApiNames } from '../constants/ApiNames';
import { postRequest } from './NetworkServices';

export const postIntakeNotesService = async (data: {
  rawRecordingData: string;
}) => {
  let completeEndPoint = `${ApiNames.generateIntakeNotes}`;
  let { data: response }: { data: IGenerateIntakeNotesResponse } =
    await postRequest(completeEndPoint, data);
  return response;
};

export const postIntakeDocumentService = async (data: {
  rawRecordingData: string;
}) => {
  let completeEndPoint = `${ApiNames.generateIntakeDocuments}`;
  let response = await postRequest(completeEndPoint, data);
  return response;
};

export const postConsultantNotesService = async (data: {
  rawRecordingData: string;
}) => {
  let completeEndPoint = `${ApiNames.generateConsultantNotes}`;
  let { data: response }: { data: IGenerateIntakeNotesResponse } =
    await postRequest(completeEndPoint, data);
  return response;
};

export const postConsultantDocumentService = async (data: {
  rawRecordingData: string;
}) => {
  let completeEndPoint = `${ApiNames.generateConsultantDocuments}`;
  let response = await postRequest(completeEndPoint, data);
  return response;
};
