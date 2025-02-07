import { IMyPatientItems } from './CommonTypes';

export interface IGetMyPatientsResponse {
  items: IMyPatientItems[];
  nextPageToken: string;
  previousPageToken: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IGetPatientDetailsResponse {
  patientId: string;
  patient: {
    resourceType: string;
    id: string;
    meta: {
      versionId: string;
      lastUpdated: string;
      profile: string[];
    };
    text: {
      status: string;
      div: string;
    };
    extension: Array<{
      url: string;
      valueCodeableConcept: {
        coding: Array<{
          system: string;
          code: string;
          display: string;
        }>;
        text: string;
      };
      valueCode: string;
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
      period: {
        start: string;
      };
      assigner: {
        display: string;
      };
    }>;
    name: Array<{
      use: string;
      text: string;
      family: string;
      given: string[];
      prefix: string[];
      suffix: string[];
    }>;
    telecom: Array<{
      system: string;
      value: string;
      use: string;
      rank: number;
    }>;
    gender: string;
    birthDate: string;
    address: Array<{
      use: string;
      type: string;
      text: string;
      line: string[];
      city: string;
      district: string;
      state: string;
      postalCode: string;
      country: string;
    }>;
  };
  encounters: Array<{
    resourceType: string;
    id: string;
    meta: {
      versionId: string;
      lastUpdated: string;
    };
    status: string;
    class: {
      system: string;
      code: string;
    };
    type: Array<{
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    }>;
    subject: {
      reference: string;
      display: string;
    };
    participant: Array<{
      individual: {
        reference: string;
        display: string;
      };
      period: {
        start: string;
        end: string;
      };
      type: Array<{
        coding: Array<{
          system: string;
          code: string;
          display: string;
        }>;
        text: string;
      }>;
    }>;
    period: {
      start: string;
      end: string;
    };
    serviceProvider: {
      reference: string;
      display: string;
    };
  }>;
  observations: Array<{
    resourceType: string;
    id: string;
    meta: {
      versionId: string;
      lastUpdated: string;
      profile: string[];
    };
    status: string;
    category: Array<{
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
    }>;
    code: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    subject: {
      reference: string;
    };
    encounter: {
      reference: string;
    };
    effectiveDateTime: string;
    issued: string;
    valueCodeableConcept: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
  }>;
  conditions: Array<{
    resourceType: string;
    id: string;
    meta: {
      versionId: string;
      lastUpdated: string;
      profile: string[];
    };
    clinicalStatus: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    verificationStatus: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    category: Array<{
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    }>;
    code: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    subject: {
      reference: string;
    };
    encounter: {
      reference: string;
    };
    onsetDateTime: string;
    abatementDateTime: string;
    recordedDate: string;
  }>;
  procedures: Array<{
    resourceType: string;
    id: string;
    meta: {
      versionId: string;
      lastUpdated: string;
      profile: string[];
    };
    status: string;
    code: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    subject: {
      reference: string;
      display: string;
    };
    encounter: {
      reference: string;
      display: string;
    };
    performedPeriod: {
      start: string;
      end: string;
    };
    location: {
      reference: string;
      display: string;
    };
  }>;
  medicationAdministrations: Array<{
    resourceType: string;
    id: string;
    meta: {
      versionId: string;
      lastUpdated: string;
    };
    status: string;
    medicationCodeableConcept: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    subject: {
      reference: string;
    };
    context: {
      reference: string;
    };
    effectiveDateTime: string;
    reasonReference: Array<{
      reference: string;
    }>;
    dosage: {
      dose: {
        value: number;
      };
    };
  }>;
  documentReferences: Array<{
    id: string;
    timestamp: string;
    textContent: string;
    documentType: string;
  }>;
}

export interface IPostIntakeNotesResponse {
  smartTranscript: string;
  soapNotes: string;
}

export interface IGetUserProfileResponse {
  displayName: string;
  email: string;
  photo: string;
}

export interface IGenerateIntakeNotesResponse {
  smartTranscript: string;
  soapNotes: string;
}

export interface IPostCarePoiletResponse {
  response: string;
}
