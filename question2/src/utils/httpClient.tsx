//
import 'cross-fetch/polyfill';

//
const getData = async (url: string, headers: any): Promise<any> => {
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

};

//
export default {
  getData,
};