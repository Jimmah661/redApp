import {authorize, refresh} from 'react-native-app-auth';
// import {useUser, useUpdateUser} from '../state/UserContext';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
// Start helper functions

function setKeys(keyArray) {
  keyArray.forEach(key => {
    RNSecureStorage.set(key.name, key.data, {accessible: ACCESSIBLE.ALWAYS})
      .then(val => console.log(val))
      .catch(err => console.error('setKeys Error', err));
  });
}

function removeKeys(keyArray) {
  keyArray.forEach(key => {
    RNSecureStorage.remove(key)
      .then(res => console.log(res))
      .catch(err => console.error('removeKeys Error', err));
  });
}

// End helper functions

// Start Reddit login config

const scopes = ['identity', 'read', 'edit', 'flair', 'account'];

const config = {
  redirectUrl: 'com.redapp://oauthredirect/reddit',
  clientId: 'ogpD3h9h8DIerg',
  clientSecret: '', // empty string - needed for iOS
  scopes: scopes,
  serviceConfiguration: {
    authorizationEndpoint: 'http://localhost:5000/red-app-a0c15/us-central1/redirect',
    // authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
  },
  customHeaders: {
    token: {
      Authorization: 'Basic <base64encoded clientID:>',
    },
  },
  additionalParameters: {
    duration: 'permanent',
  },
};

// End Reddit login config

// Start Login functions

export const login = async () => {
  await authorize(config)
    .then(data => {
      console.log('Login Data', data);

      let tokenInfo = [
        {name: 'redappAccessToken', data: data.accessToken},
        {name: 'redappExpirationDate', data: data.accessTokenExpirationDate},
        {name: 'redappRefreshToken', data: data.refreshToken},
      ];

      setKeys(tokenInfo);
    })
    .catch(err => console.error('login Error', err));
};

export const logout = () => {
  RNSecureStorage.get('redappRefreshToken').then(val => {
    fetch('https://www.reddit.com/api/v1/revoke_token', {
      method: 'POST',
      body: {
        token: val,
        token_type_hint: 'refresh_token',
      },
    })
      .then(res => console.log('Token revoke response', res))
      .catch(err => console.error('logout Error', err));
  });

  removeKeys([
    'redappAccessToken',
    'redappExpirationDate',
    'redappRefreshToken',
  ]);
};

// End Login functions

export const tokenExists = token => {
  return RNSecureStorage.exists(token).then(res => {
    return res ? true : false;
  });
};

export const supplyToken = async tokenName => {
  await refreshKey();
  return tokenExists(tokenName)
    .then(val => {
      if (val) {
        return RNSecureStorage.get(tokenName).catch(err => console.error(err));
      } else {
        return false;
      }
    })
    .catch(err => console.error('supplyToken Error', err));
};

export const refreshKey = () => {
  return tokenExists('redappExpirationDate')
    .then(exists => {
      if (exists) {
        return RNSecureStorage.get('redappExpirationDate');
      }
    })
    .then(async val => {
      let currentDate = new Date();
      let storedDate = new Date(val);
      if (currentDate > storedDate || currentDate === storedDate) {
        console.log('token out of Date');
        const refreshToken = await RNSecureStorage.get('redappRefreshToken');
        const updatedToken = await refresh(config, {
          refreshToken: refreshToken,
        });
        let tokenInfo = [
          {name: 'redappAccessToken', data: updatedToken.accessToken},
          {
            name: 'redappExpirationDate',
            data: updatedToken.accessTokenExpirationDate,
          },
          {name: 'redappRefreshToken', data: updatedToken.refreshToken},
        ];
        setKeys(tokenInfo);
      }
    })
    .catch(err => console.error('refreshKey Error', err));
};
