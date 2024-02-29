// const devUrl = process.env.REACT_APP_URL_DEV;
// const prodUrl = process.env.REACT_APP_URL_PROD;

export const url = process.env.REACT_APP_ENV === 'development' ? process.env.REACT_APP_URL_DEV : process.env.REACT_APP_URL_PROD;