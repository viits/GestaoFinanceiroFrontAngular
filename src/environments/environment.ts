


//Dev
// const link = 'https://portal-dev-api.gdllogistica.com.br/';
// const link = 'https://portal-dev-api.gdllogistica.com.br/';
//LocalHost
const link = 'https://localhost:7091/';


//NGronk
// const link = 'http://localhost:5106/';

// export const environment = {
//   url: link,

//   apiUrl: link + `api/`,

//   production: false,
// };

const portal = "financeiro"

export const environment = {
  version: "1.0.0",
  production: true,
  apiUrl: link + `api/`,
  AUTHENTICATION: {
    authority: '',
    client_id: portal.toLocaleUpperCase(),
  }
};
