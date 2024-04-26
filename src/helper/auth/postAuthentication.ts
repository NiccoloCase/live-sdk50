import { WhoamiDocument } from "../../generated/graphql";
import { client } from "../../graphql";
import { initActivitySocket } from "../../screens/ActivityTab/socket";
import { initLanguageService } from "../i18next";
import { initInstallationId } from "../initInstallationId";
import { initWebSocket } from "../socket";

/** Funzione chiamata dopo l'autenticazione (online) */
export const postOnlineAuthentication = async () => {
  // Carica il profilo dell'utente
  const { data: me } = await client.query({
    query: WhoamiDocument,
    fetchPolicy: "network-only",
  });

  // Inizializza la connessione socket
  initWebSocket();
  initActivitySocket();

  // Inizializzazione lingua
  initLanguageService().catch(console.warn);

  if (!me?.whoami?.ban?.banned) {
    // Inizializza l'ID dell'installazione
    initInstallationId().then(console.warn);
  }
};

/** Funzione chiamata dopo l'autenticazione (offline) */
export const postOfflineAuthentication = async () => {
  // Inizializza l'ID dell'installazione
  await initInstallationId();
};
