import { ImageSourcePropType } from 'react-native';

export interface IonBoardingData {
  id: number;
  image: ImageSourcePropType;
  description: string;
}

export interface IMyPatientItems {
  resourceType: string;
  status?: string;
  id: string;
  meta: {
    versionId: string;
    lastUpdated: string;
    profile: Array<string>;
  };
  text: {
    status: string;
    div: string;
  };
  extension: Array<{
    url: string;
    valueCodeableConcept?: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    valueCode?: string;
  }>;
  identifier: Array<{
    use: string;
    type: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    system: string;
    value: string;
    period?: {
      start: string;
    };
    assigner?: {
      display: string;
    };
  }>;
  name: Array<{
    use: string;
    text: string;
    family: string;
    given: Array<string>;
    prefix?: Array<string>;
    suffix?: Array<string>;
  }>;
  telecom?: Array<{
    system: string;
    value: string;
    use: string;
    rank?: number;
  }>;
  gender?: string;
  birthDate?: string;
  address?: Array<{
    use: string;
    type: string;
    text: string;
    line?: Array<string>;
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }>;
}

export interface IMyPatientsResponse {
  items: IMyPatientItems[];
  nextPageToken?: string;
  previousPageToken?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IUserDetails {
  '@odata.context': string;
  userPrincipalName: string | null;
  id: string | null;
  displayName: string;
  surname: string | null;
  givenName: string | null;
  preferredLanguage: string | null;
  mail: string | null;
  mobilePhone: string | null;
  jobTitle: string | null;
  officeLocation: string | null;
  businessPhones: string[];
}

export interface ICarePoiletData {
  patientID: string;
  userQuery: string;
}
