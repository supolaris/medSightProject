import { IMyPatientsResponse } from '../@types/CommonTypes';

export const onBoardingData = [
  {
    id: 1,
    image: require('../assets/images/onBoarding/onBoarding1.webp'),
    description:
      'Elevating Doctor Experience. Your Co-Pilot in Optimised Healthcare Delivery',
  },
  {
    id: 2,
    image: require('../assets/images/onBoarding/onBoarding2.webp'),
    description:
      'Guiding Health, Empowering Lives Your Trusted Healthcare Co-pilot',
  },
  {
    id: 3,
    image: require('../assets/images/onBoarding/onBoarding3.webp'),
    description:
      'Guiding Health, Empowering Lives Your Trusted Healthcare Co-pilot',
  },
];

export const patientsData: IMyPatientsResponse = {
  items: [
    {
      resourceType: 'Patient',
      id: '691e4dc0-7204-4701-8a36-80d61dfdc8fd',
      status: 'Active',
      meta: {
        versionId: '4',
        lastUpdated: '2024-02-20T01:23:07.912Z',
        profile: [
          'http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient',
        ],
      },
      name: [
        {
          use: 'official',
          family: 'Roberts',
          given: ['John'],
        },
      ],
      gender: 'female',
      birthDate: '1980-01-01T00:00:00Z',
      address: [
        {
          use: 'home',
          line: ['123 Main St'],
          city: 'Anytown',
          state: 'State',
          postalCode: '12345',
          country: 'USA',
        },
      ],
    },
    {
      resourceType: 'Patient',
      id: 'PQC00000017',
      meta: {
        versionId: '1',
        lastUpdated: '2024-02-21T00:18:08.988Z',
        profile: [
          'http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient',
        ],
      },
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml">Julia17 Test17</div>',
      },
      extension: [
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race',
        },
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity',
        },
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
          valueCode: 'M',
        },
      ],
      identifier: [
        {
          use: 'official',
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                code: 'PI',
                display: 'Patient internal identifier',
              },
            ],
          },
          system: 'http://www.kerringtoninc.com/randy',
          value: 'D000000001-1',
          period: {
            start: '1968-01-11T00:00:00Z',
          },
          assigner: {
            display: 'EMPI - Enterprise ID system',
          },
        },
      ],
      name: [
        {
          use: 'official',
          text: 'Julia17 Test17',
          family: 'Test17',
          given: ['Julia17'],
        },
      ],
      telecom: [
        {
          system: 'phone',
          value: '000-000-0017',
          use: 'mobile',
        },
        {
          system: 'email',
          value: 'Julia17@test17.com',
        },
      ],
      gender: 'male',
      birthDate: '1968-01-11T00:00:00Z',
      address: [
        {
          use: 'home',
          line: ['4 Skyer Circle'],
          city: 'Redmond',
          state: 'WA',
          postalCode: '98052',
          country: 'US',
        },
      ],
    },
    {
      resourceType: 'Patient',
      id: 'PQC00000012',
      meta: {
        versionId: '2',
        lastUpdated: '2024-02-22T16:19:27.515Z',
        profile: [
          'http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient',
        ],
      },
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml">Daniel12 Test12</div>',
      },
      extension: [
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race',
        },
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity',
        },
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
          valueCode: 'M',
        },
      ],
      identifier: [
        {
          use: 'official',
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                code: 'PI',
                display: 'Patient internal identifier',
              },
            ],
          },
          system: 'https://www.adunoshinc.com/nathan',
          value: 'PQC00000012',
          period: {
            start: '2000-03-02T00:00:00Z',
          },
          assigner: {
            display: 'EMPI - Enterprise ID system',
          },
        },
      ],
      name: [
        {
          use: 'official',
          text: 'Daniel12 Test12',
          family: 'Test12',
          given: ['Daniel12'],
        },
      ],
      telecom: [
        {
          system: 'phone',
          value: '000-000-0012',
          use: 'mobile',
        },
        {
          system: 'email',
          value: 'daniel12@test12.com',
        },
      ],
      gender: 'male',
      birthDate: '2000-03-02T00:00:00Z',
      address: [
        {
          use: 'home',
          line: ['370 Lytle Place'],
          city: 'Redmond',
          state: 'WA',
          postalCode: '98051',
          country: 'US',
        },
      ],
    },
    {
      resourceType: 'Patient',
      id: '6ed97fec-fb85-405c-827d-c46f543e6f83',
      status: 'Active',
      meta: {
        versionId: '1',
        lastUpdated: '2024-02-24T01:10:27.488Z',
      },
      name: [
        {
          family: 'Marcelo',
          given: ['Rodriguez'],
        },
      ],
      telecom: [
        {
          value: '234-234-2345',
        },
      ],
      gender: 'male',
      birthDate: '1973-03-03T00:00:00Z',
    },
    {
      resourceType: 'Patient',
      id: '77d392d2-cd55-46d8-81f2-ae05791a28ee',
      meta: {
        versionId: '1',
        lastUpdated: '2024-02-24T01:28:47.91Z',
      },
      name: [
        {
          family: 'Martin',
          given: ['Brundle'],
        },
      ],
      telecom: [
        {
          value: '222-333-4444',
        },
      ],
      gender: 'male',
      birthDate: '1987-09-09T00:00:00Z',
      address: [
        {
          line: ['1234 Center Drive'],
          city: 'Arlington',
          state: 'TX',
          postalCode: '97322',
          country: 'United States',
        },
      ],
    },
    {
      resourceType: 'Patient',
      id: '050903d8-5787-4f88-b15e-d2d0b251295c',
      meta: {
        versionId: '1',
        lastUpdated: '2024-03-06T01:56:51.331Z',
      },
      name: [
        {
          family: 'Pablo',
          given: ['Rodriguez'],
        },
      ],
      telecom: [
        {
          value: '333-333-3333',
        },
      ],
      gender: 'male',
      birthDate: '1976-09-09T00:00:00Z',
    },
    {
      resourceType: 'Patient',
      id: '8f3691c9-321f-4a93-b667-05cfde05c8f4',
      meta: {
        versionId: '1',
        lastUpdated: '2024-04-13T23:28:32.456Z',
      },
      name: [
        {
          family: 'Roger',
          given: ['Morris'],
        },
      ],
      gender: 'male',
      birthDate: '1964-01-07T00:00:00Z',
    },
    {
      resourceType: 'Patient',
      id: '8952243a-91e8-425f-8424-e8604e208e29',
      meta: {
        versionId: '1',
        lastUpdated: '2024-04-16T05:32:24.026Z',
      },
      name: [
        {
          family: 'Novak',
          given: ['Adam'],
        },
      ],
      gender: 'male',
      birthDate: '1969-01-15T00:00:00Z',
    },
    {
      resourceType: 'Patient',
      id: '422d9c6e-3873-461e-baac-977d7dfb83d2',
      meta: {
        versionId: '1',
        lastUpdated: '2024-04-22T00:35:08.442Z',
      },
      name: [
        {
          family: 'Thompson',
          given: ['Sarah'],
        },
      ],
      telecom: [
        {
          value: '650-000-0001',
        },
      ],
      gender: 'female',
      birthDate: '1989-03-10T00:00:00Z',
      address: [
        {
          line: ['1600 Amphitheatre Pkwy'],
          city: 'Mountain View',
          state: 'CA',
          postalCode: '94043',
          country: 'USA',
        },
      ],
    },
    {
      resourceType: 'Patient',
      id: '5ccf84c9-d40f-4d7b-9469-2b3a459140a5',
      meta: {
        versionId: '1',
        lastUpdated: '2024-04-22T00:51:01.538Z',
      },
      name: [
        {
          family: 'Smith',
          given: ['John'],
        },
      ],
      telecom: [
        {
          value: '408-000-0001',
        },
      ],
      gender: 'male',
      birthDate: '1952-09-05T00:00:00Z',
      address: [
        {
          line: ['2788 San Tomas Expy'],
          city: 'Santa Clara',
          state: 'CA',
          postalCode: '95051',
          country: 'USA',
        },
      ],
    },
  ],
  nextPageToken:
    'https://medsightaidsworkspace-msaifhir.fhir.azurehealthcareapis.com/Patient?_count=10&ct=er97f5lRTbShgbGOqaGBuaWJuamBhaWRsYGJgZG5USwAAAD%2F%2Fw%3D%3D',
  hasNextPage: true,
  hasPreviousPage: false,
};
