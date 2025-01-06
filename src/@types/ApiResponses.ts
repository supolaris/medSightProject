import { IMyPatientItems } from './CommonTypes';

export interface IGetMyPatientsResponse {
  items: IMyPatientItems[];
  nextPageToken: string;
  previousPageToken: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
