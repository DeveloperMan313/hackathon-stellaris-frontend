import { PUBLIC_API_ORIGIN } from '$env/static/public';

function getAuthToken(): string | null {
  return localStorage.getItem('access_token');
}

/**
 * Base API client that sends JSON, cookies and works with CORS
 */
export const ApiClient = {
  async fetch(inputRelative: string, init?: RequestInit, credentials: boolean = false): Promise<Response> {
    if (!init) {
      init = {};
    }
    init.mode = 'cors';
    init.credentials = 'include';
    if (!init.headers) {
      init.headers = {
        'Content-Type': 'application/json'
      };
    }

    if (credentials) {
      const token = getAuthToken();
      if (token) {
        (init.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(PUBLIC_API_ORIGIN + inputRelative, init);

    // turned off because i worry for epileptic people
    // if (response.status >= 500) {
    //   alert('Service unavailable');
    // }

    return response;
  },

  async fetchJSON(inputRelative: string, init?: RequestInit, credentials: boolean = false) {
    const response = await ApiClient.fetch(inputRelative, init, credentials);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.error);
    }
    return json;
  }
};
