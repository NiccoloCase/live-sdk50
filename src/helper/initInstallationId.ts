import * as SecureStore from "expo-secure-store";
import { store } from "../store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

/** Chiave con la quale è salvato l'ID dell'installazione nello storage */
const INSTALLATION_ID_KEY = "installation-id";

export const initInstallationId = async (): Promise<void> => {
  if (!(await SecureStore.isAvailableAsync())) return;

  // Controlla se esiste già un ID salvato in memoria
  let id: string | null;
  id = await SecureStore.getItemAsync(INSTALLATION_ID_KEY);

  // Se non esiste lo genera
  if (!id) {
    id = uuidv4();
    await SecureStore.setItemAsync(INSTALLATION_ID_KEY, id);
  }

  // Salva l'id nello stato dell'app
  store.getActions().auth.setInstallationId(id);
};
