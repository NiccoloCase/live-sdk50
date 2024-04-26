import { Action, action, thunk, Thunk } from "easy-peasy";
import jwtDecode from "jwt-decode";
import {
  setRefreshTokenInStorage,
  setUserIdInStorage,
} from "../../helper/auth/refreshToken";

interface TokensPayload {
  accessToken: string;
  refreshToken: string;
}

export interface AuthModel {
  // valori
  accessToken: string;
  refreshToken: string;
  userId: string;
  isAuthenticated: boolean;
  installationId?: string | null;
  spotifyAccessTokenExpirationDate?: string;
  offlineAuth?: boolean | null;
  isInstagramAuthLoading?: boolean;
  // azioni
  setIsAuthenticated: Action<AuthModel, boolean>;
  setUserId: Action<AuthModel, string>;
  setAccessToken: Action<AuthModel, string>;
  setRefreshToken: Action<AuthModel, string>;
  setInstallationId: Action<AuthModel, string | undefined | null>;
  setSpotifyAccessTokenExpirationDate: Action<AuthModel, string | undefined>;
  authenticateOffline: Action<AuthModel, string>;
  setOfflineAuth: Action<AuthModel, boolean>;
  setIsInstagramAuthLoading: Action<AuthModel, boolean | undefined>;
  // thunk
  setTokens: Thunk<AuthModel, TokensPayload>;
  singin: Thunk<AuthModel, TokensPayload>;
  logout: Thunk<AuthModel, void>;
}

const authModel: AuthModel = {
  isAuthenticated: false,
  userId: "",
  accessToken: "",
  refreshToken: "",

  /**
   * Modifica se l'utente è autenticato
   */
  setIsAuthenticated: action((state, isAuthenticated) => ({
    ...state,
    isAuthenticated,
  })),

  /**
   * Imposta l'ID dell'utente loggato
   */
  setUserId: action((state, userId) => ({
    ...state,
    userId,
  })),

  /**
   * Imposta un nuovo token di accesso
   */
  setAccessToken: action((state, accessToken) => ({
    ...state,
    accessToken,
  })),

  /**
   * Imposta un nuovo token di aggiornamento
   */
  setRefreshToken: action((state, refreshToken) => ({
    ...state,
    refreshToken,
  })),

  /**
   * Imposta l'ID dell'installazione dell'app
   */
  setInstallationId: action((state, installationId) => ({
    ...state,
    installationId,
  })),

  /**
   * Imposta la data di scandenza del token di accesso per l'API di Spotify
   */
  setSpotifyAccessTokenExpirationDate: action(
    (state, spotifyAccessTokenExpirationDate) => ({
      ...state,
      spotifyAccessTokenExpirationDate,
    })
  ),

  /**
   * Autenticazione offline
   */
  authenticateOffline: action((state, userId) => ({
    ...state,
    userId,
    isAuthenticated: true,
    offlineAuth: true,
  })),

  setOfflineAuth: action((state, offlineAuth) => ({
    ...state,
    offlineAuth,
  })),

  /**
   * Autenticazione API di Instagram
   */
  setIsInstagramAuthLoading: action((state, isInstagramAuthLoading) => ({
    ...state,
    isInstagramAuthLoading,
  })),

  /**
   * Imposta un nuovo token di aggiornamento e un nuovo
   * token di accesso
   */
  setTokens: thunk(async (actions, payload) => {
    const { accessToken, refreshToken } = payload;

    // imposta il nuovo token di accesso
    actions.setAccessToken(accessToken);
    // imposta il nuovo token di aggiornamento
    await setRefreshTokenInStorage(refreshToken);
    actions.setRefreshToken(refreshToken);
  }),

  /**
   * Imposta un nuovo token di aggiornamento, un nuovo token
   * di accesso e aggiorna lo stato di autenticazione dell'utente
   */
  singin: thunk(async (actions, payload) => {
    const { accessToken, refreshToken } = payload;

    // preleva dal token l'id dell'utente loggato
    const { userId } = jwtDecode(accessToken) as any;
    actions.setUserId(userId);
    setUserIdInStorage(userId);

    // Imposta i nuovi token
    actions.setTokens({ accessToken, refreshToken });

    // aggiorna lo stato riguardo l'autenticazione dell'utente
    actions.setIsAuthenticated(true);

    // Aggriona lo stato della connessione
    actions.setOfflineAuth(false);
  }),

  /**
   * Disconnette l'utente loggato
   */
  logout: thunk(async (actions) => {
    try {
      // elimina il token di accesso e di aggiornamento
      actions.setTokens({ accessToken: "", refreshToken: "" });
      // aggiorna lo stato riguardo l'autenticazione dell'utente
      actions.setIsAuthenticated(false);
    } catch (err) {
      console.warn(err);
    }
  }),
};

export default authModel;
