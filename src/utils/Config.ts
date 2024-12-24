export const microsoftBaseUrl = 'https://graph.microsoft.com/v1.0/me';

const TENANT_ID: string = 'b8734988-de75-416e-b428-c548931d6a65';
const CLIENT_ID: string = 'c8f7e82c-d8b9-4b85-90d0-b7dbb1d6afc5';

export const MicrosoftConfiguration: any = {
  identifyServer: {
    serviceConfiguration: {
      authorizationEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    },
    clientId: CLIENT_ID,
    redirectUrl: 'com.medsight://oauth/auth/',
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  },
  auth0: {
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    clientId: CLIENT_ID,
    redirectUrl: 'com.medsight://oauth/auth/',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'phone', 'address', 'User.Read'],
    revocationEndpoint: `https://logout.microsoftonline.com/${TENANT_ID}/oauth2/v2.0`,
  },
};
