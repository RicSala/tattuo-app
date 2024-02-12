const { default: axios } = require("axios");

const apiClient = axios.create({
    baseURL: "/api",
});

// TODO: Next version could consider interceptors
// const STATUS_UNAUTHORIZED = 401;
// const STATUS_FORBIDDEN = 403;
// const getErrorMessage = (error) => {
//     if (error.response?.status === STATUS_UNAUTHORIZED) {
//         // User not auth, ask to relogin
//         signIn(undefined, { callbackUrl: config.callbackUrl });
//         return "Please login";
//     }

//     if (error.response?.status === STATUS_FORBIDDEN) {
//         // User not authorized, must subscribe/purchase/pick a plan
//         return "Pick a plan to use this feature";
//     }

//     return error?.response?.data?.error || error.message || error.toString();
// };

// apiClient.interceptors.response.use(
//     response => response,
//     error => {
//         const errorMessage = getErrorMessage(error);

//         toast({
//             title: "Error",
//             description: errorMessage
//         });

//         return Promise.reject(error);
//     }
// );

export { apiClient };

// TODO: If we can to migrate to fetch:

// const apiClient = {
//   baseURL: '/api',

//   async get(endpoint, options = {}) {
//     const response = await fetch(this.baseURL + endpoint, { ...options, method: 'GET' });
//     return this.processResponse(response);
//   },

//   async post(endpoint, data, options = {}) {
//     const headers = { 'Content-Type': 'application/json', ...options.headers };
//     const response = await fetch(this.baseURL + endpoint, {
//       ...options,
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(data),
//     });
//     return this.processResponse(response);
//   },

//   // This function is used to process the response and throw an error if not ok
//   async processResponse(response) {
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(error);
//     }
//     return response.json();
//   },
// };

// // Usage
// apiClient.get('/some-endpoint')
//   .catch(error => console.error(error));

// apiClient.post('/some-endpoint', { key: 'value' })
//   .catch(error => console.error(error));
