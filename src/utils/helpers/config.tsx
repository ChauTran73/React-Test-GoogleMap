export const configs = () => {
  if (
    window.location.hostname.includes('dev') ||
    process.env.NODE_ENV === 'development'
  ) {
    return {
      APP_KEY: '123axxafafacaxxaf1',
      APP_ID: 'csp_portal',
      VERSION: '1.0',
      UPLOAD_URL: 'https://assets.dev.tripi.vn',
      LOGIN_BASE_URL: 'https://dev-api.tripi.vn',
      BASE_URL: 'https://gate.dev.tripi.vn',
      SOCKET: 'wss://chat.dev.tripi.vn',
    };
  }
  if (window.location.hostname.includes('stage')) {
    return {
      APP_KEY: 'axddsd12fvfaaxxa123faf',
      APP_ID: 'chat_portal',
      VERSION: '1.0',
      UPLOAD_URL: 'https://assets.tripi.vn',
      LOGIN_BASE_URL: 'https://hotelapi.tripi.vn',
      BASE_URL: 'https://gate.tripi.vn',
      SOCKET: 'wss://chat.tripi.vn',
    };
  }
  return {
    APP_KEY: 'axddsd12fvfaaxxa123faf',
    APP_ID: 'chat_portal',
    VERSION: '1.0',
    UPLOAD_URL: 'https://assets.tripi.vn',
    LOGIN_BASE_URL: 'https://hotelapi.tripi.vn',
    BASE_URL: 'https://gate.tripi.vn',
    SOCKET: 'wss://chat.tripi.vn',
  };
};
