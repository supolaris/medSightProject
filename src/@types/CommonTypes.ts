import { ImageSourcePropType } from 'react-native';

export interface IonBoardingData {
  id: number;
  image: ImageSourcePropType;
  description: string;
}

export interface IMyPatientItems {
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
  extension: [
    {
      url: string;
      valueCodeableConcept: {
        coding: [
          {
            system: string;
            code: string;
            display: string;
          },
        ];
        text: string;
      };
      valueCode: string;
    },
  ];
  identifier: [
    {
      use: string;
      type: {
        coding: [
          {
            system: string;
            code: string;
            display: string;
          },
        ];
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
    },
  ];
  name: [
    {
      use: string;
      text: string;
      family: string;
      given: string[];
      prefix: string[];
      suffix: string[];
    },
  ];
  telecom: [
    {
      system: string;
      value: string;
      use: string;
      rank: number;
    },
  ];
  gender: string;
  birthDate: string;
  address: [
    {
      use: string;
      type: string;
      text: string;
      line: string[];
      city: string;
      district: string;
      state: string;
      postalCode: string;
      country: string;
    },
  ];
}
