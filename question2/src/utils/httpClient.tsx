//
import 'cross-fetch/polyfill';

//
const getData = async (url: string, headers: any): Promise<any> => {
  let lastError;
  const maxRetries = 3;

  //
  for (let i = 0; i < maxRetries; i++) {
    try {
      //
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      //
      if (response.status === 401) {
        throw new Error('REQUEST_ERROR_UNAUTHORIZED');
      }

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('REQUEST_ERROR_NETWORK_FAILED');
      }
      // Parse the response as JSON and return the data
      const data = await response.json();

      //
      return data;
    } catch (error) {
      lastError = error;
    }
  }
  // @Todo: Send Error to Tracker (e.g. sentry)
  throw lastError;
};

//
export default {
  getData,
};