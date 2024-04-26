import io, { Socket } from "socket.io-client";
import { store } from "../store";
import { API_URL, SERVER_URL, SOCKET_IO_PATH } from "./APIs/myApi";
import { fetchAccessToken } from "./auth/fetchAccessToken";

const actions = store.getActions();

const socket: Socket = io(SERVER_URL, {
  autoConnect: false,
  reconnection: true,
  path: SOCKET_IO_PATH,
});

// Connessione
socket.on("connect", () => {
  //actions.chat.setConncted(true);
  console.log("socket:connect " + SERVER_URL + SOCKET_IO_PATH);
});

// Riconessione
socket.io.on("reconnect_attempt", () =>
  console.log("socket:reconnect_attempt")
);
socket.io.on("reconnect", () => {
  console.log("socket:reconnect");
  // TODO setAdvertsing

  //actions.chat.setDisconnectionDate(null);
});

// Disconnessione
socket.on("disconnect", async (reason: string) => {
  console.log("socket:disconnect", { reason });
  //actions.chat.setDisconnectionDate(new Date());
  //actions.chat.setConncted(false);

  if (reason === "io server disconnect") {
    // Il socket è stato disconnesso dal server -
    // -> richiede un nuovo token di accesso
    getNewAccessTokenForSocket();
  }
});

// Errore nella connessione
socket.on("connect_error", (err: any) => {
  console.log("connect_error", err);
  //actions.chat.setConncted(false);
  getNewAccessTokenForSocket();

  // Riprova a riconnettersi
  setTimeout(() => socket!.connect(), 1000);
});

// Errore
socket.on("exception", (payload: any) => {
  console.log("chat - exception", payload);
  // @todo snackbar
});

export const initWebSocket = () => {
  const state = store.getState();

  // Verifica che l'utente sia autenticato
  if (!state.auth.isAuthenticated || !state.auth.accessToken) return;

  // Imposta l'header per l'autenticazione
  socket.io.opts.transportOptions = {
    polling: {
      extraHeaders: {
        Authorization: state.auth.accessToken,
      },
    },
  };
  // ID del dispositivo
  socket.io.opts.query = {
    deviceId: state.auth.installationId!,
  };

  // Connette il socket al server
  socket.connect();

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket.connected) initWebSocket();

  return socket;
};

export const reconnect = () => {
  if (!socket.connected) socket.connect();
};

export const getNewAccessTokenForSocket = async () => {
  console.log("getting new socket.io accesso token");
  try {
    const res = await fetchAccessToken();
    if (res) {
      const data = await res.json();

      if (data && data.success && data.tokens) {
        // Imposta il nuovo token di accesso e quello di aggiornamento
        const { accessToken, refreshToken } = data.tokens;

        console.log("setting new socket.io accesso token", {
          accessToken,
          refreshToken,
        });
        await actions.auth.singin({ accessToken, refreshToken });
        // Imposta il nuovo header
        socket.io.opts.transportOptions = {
          polling: {
            extraHeaders: {
              Authorization: accessToken,
            },
          },
        };
        // Riconnette il socket
        socket.connect();
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const logoutSocket = () => {
  socket.io.opts.transportOptions = {
    polling: {
      extraHeaders: {
        Authorization: null,
      },
    },
  };
  socket.disconnect();
};

export const pingServerAdvertise = async () => {
  const ping_id = store.getState().nearby.pingId;
  if (!ping_id) {
    console.warn("ping_id not found");
    return;
  }

  const res = await fetch(API_URL + "/ping", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ping_id }),
  });
  const data = await res.json();
  if (!data.success) {
    console.warn("pingServerAdvertise", data);
  }
};
