import { ApolloLink } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { fetchAccessToken } from "../helper/auth/fetchAccessToken";
import { GRAPHQL_API } from "../helper/APIs/myApi";
import { store } from "../store/store";
import QueueLink from "apollo-link-queue";
import SerializingLink from "apollo-link-serialize";
import { isMutationOperation } from "./utils";

export const httpLink = new HttpLink({ uri: GRAPHQL_API });

/** Gestione autenticazione */
export const authLink = setContext((_, { headers }) => {
  const { accessToken } = store.getState().auth;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

/** Gestione del rinnovo del token di accesso */
export const tokenRefreshLink = new TokenRefreshLink<{
  accessToken: string;
  refreshToken: string;
}>({
  accessTokenField: "tokens",
  isTokenValidOrUndefined: () => {
    const token = store.getState().auth.accessToken;

    if (!token) return true;

    try {
      const { exp } = jwtDecode(token) as any;
      // controlla se il token di accesso è scaduto
      return Date.now() <= exp * 1000;
    } catch {
      return false;
    }
  },
  fetchAccessToken: fetchAccessToken as any,
  handleFetch: (tokens) => {
    const { accessToken, refreshToken } = tokens;
    // aggiorna il token di accesso e il token di aggiornamento
    store.getActions().auth.singin({ accessToken, refreshToken });
  },
  handleError: (err) => {
    console.warn(err);
    store.getActions().auth.setIsAuthenticated(false);
  },
});

/** Gestione errori */
export const errorLink = onError(
  ({ graphQLErrors, networkError, operation }) => {
    // riporta l'utente alla schermata di autenticazione se l'errore
    // ha come stato 401 (e non è offline)

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (
          err.extensions &&
          err.extensions.exception &&
          err.extensions.exception.status === 401 &&
          !store.getState().auth.offlineAuth
        ) {
          store.getActions().auth.setIsAuthenticated(false);
        }
      }
    }

    // Errore di connessione
    if (networkError) {
      console.warn(networkError);
      console.log(JSON.stringify(networkError));

      if (isMutationOperation(operation))
        store
          .getActions()
          .snackbar.open({ message: "Non è possibile connetteri al server" });
    }
  }
);

/** Gestione offline coda di richieste  */
export const queueLink = new QueueLink();

/** Gestione richieste offline (avverte l'utente) */
export const offlineLink = new ApolloLink((operation, forward) => {
  if (
    !store.getState().network.isOnline &&
    operation.getContext().notifyIfOffline &&
    isMutationOperation(operation)
  )
    store.getActions().snackbar.open({
      message: "L'operazione sarà portata a termine appena online",
    });

  return forward(operation);
});

/** Serializzazione ichieste */
export const serializingLink = new SerializingLink();
