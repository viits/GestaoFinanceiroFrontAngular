



//LocalHost
// const link = 'https://localhost:7091/';
 const link = 'https://gestaofinanceiroapi.onrender.com/';

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
