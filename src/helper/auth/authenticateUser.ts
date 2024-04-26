import { store } from "../../store";
import { fetchAccessToken } from "./fetchAccessToken";

export const authenticateUser = async (): Promise<boolean> => {
  // Richiede al server un nuovo token di accesso
  const res = await fetchAccessToken();

  if (res) {
    const data = await res.json();

    if (data && data.success && data.tokens) {
      // Imposta il nuovo token di accesso e quello di aggiornamento
      const { accessToken, refreshToken } = data.tokens;
      await store.getActions().auth.singin({ accessToken, refreshToken });

      return true;
    } else {
      console.warn(res, data);
    }
  }

  return false;
};
