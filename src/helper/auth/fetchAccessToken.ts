import { getRefreshTokenFromStorge } from "./refreshToken";
import { API_URL } from "../APIs/myApi";

/**
 * Esegue una richiesta al server per rinnovare il il token di accesso
 */

export const fetchAccessToken = async () => {
  const refresh_token = await getRefreshTokenFromStorge();

  if (!refresh_token) return;

  const url = API_URL + "/auth/refresh_token";
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token }),
  });
};
