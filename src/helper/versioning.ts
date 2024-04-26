import { API_URL } from "./APIs/myApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearCache } from "../graphql";
import { store } from "../store";
import * as Updates from "expo-updates";
import { keys } from "../config";

// TODO
const VERSION_INFO_KEY = "app-version-info-key";

interface VersionInfo {
  isVersionValid: boolean;
  lastAppServerInterfaceVersion: string;
  nextMajorVersionRelease?: Date;
  lastCheckDate: Date;
}

/**
 * Se presenta una nuova versione aggiorna l'app
 * @returns se l'operazione ha avuto successp
 */
const updateApp = async (): Promise<boolean> => {
  console.log("trying updating app...");
  store.getActions().versioning.setIsUpdating(true);
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Updates.reloadAsync();
      return true;
    } else {
      store.getActions().versioning.setIsUpdating(false);
      return false;
    }
  } catch (e) {
    console.warn(e);
    store.getActions().versioning.setIsUpdating(false);
    return false;
  }
};

/**
 * Confronta la versione dell'app con quella del server
 * @returns Restituisce se la versione dell'app è compatibile con quella del server
 */
const compareAppAndApiVersions = async () => {
  // Richiede al server informazioni riguardo le versioni dell'API
  const res = await fetch(API_URL + `/versioning/info`);
  const data = await res.json();

  if (res.status >= 400 || !res.ok || !data?.currentVersion) return null;

  const apiVersion = data?.currentVersion;

  // Verifica che la versione dell'app sia compatibile con l'API
  if (keys.SERVER_MAJOR_VERSION < getMajorVersion(apiVersion)) {
    // VERSIONE NON COMPATIBILE:

    // Prova ad aggiornare l'app
    const success = await updateApp();
    console.log({ success });
    if (!success) {
      // Salva le informazioni nello storage
      AsyncStorage.setItem(
        VERSION_INFO_KEY,
        JSON.stringify({
          lastAppServerInterfaceVersion: keys.SERVER_MAJOR_VERSION,
          lastCheckDate: new Date(),
          isVersionValid: false,
        })
      ).catch(console.warn);
      store.getActions().versioning.setIsVersionValid(false);

      return false;
    } else return null;
  }

  // VERSIONE COMPATIBILE:

  // Salva in memoria le info rigiardo la prossima versione
  if (data.nextMajorVersion)
    store.getActions().versioning.setNextMajorVersion(data.nextMajorVersion);

  // Salva le informazioni nello storage
  AsyncStorage.setItem(
    VERSION_INFO_KEY,
    JSON.stringify({
      lastAppServerInterfaceVersion: keys.SERVER_MAJOR_VERSION,
      isVersionValid: true,
      lastCheckDate: new Date(),
      nextMajorVersionRelease: data.nextMajorVersion?.releaseDate,
    })
  ).catch(console.warn);
  store.getActions().versioning.setIsVersionValid(true);

  return true;
};

/**
 * Verifica della versione dell'app all'avvio
 */
export const startupVersionCheck = async () => {
  console.log("Supported server version: " + keys.SERVER_MAJOR_VERSION);

  if (keys.SERVER_MAJOR_VERSION === null) return null;

  // Controlla se ci sono informazioni salvate
  const data = await AsyncStorage.getItem(VERSION_INFO_KEY);

  if (data) {
    const info: VersionInfo = JSON.parse(data);

    //Verifica se la nuova versione è una versione con breacking changes
    if (
      info.lastAppServerInterfaceVersion &&
      Number(info.lastAppServerInterfaceVersion) < keys.SERVER_MAJOR_VERSION
    ) {
      // Elimina la cache di apollo per evitare problemi di compatibilità con un nuovo schema
      clearCache();
      console.log("Clearing cache");
    }

    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() - 2);

    if (
      // Se la vecchia versione è valida
      info.isVersionValid &&
      // Se il controllo della versione è stato eseguito da meno di 2 giorni
      new Date(info.lastCheckDate) >= dateOffset &&
      // E se è programmato il rilascio di una nuova versione
      (!info.nextMajorVersionRelease ||
        new Date().getTime() < info.nextMajorVersionRelease.getTime())
    ) {
      // Salta il controllo della versione con il server (che viene eseguito asincrono)
      compareAppAndApiVersions().catch(console.warn);
      console.log("Skipping sync versioning check");
      return true;
    }
  }
  // E' necessario eseguire il controllo della versione con il server
  console.log("Versioning: skipping sync versioning check");
  const res = await compareAppAndApiVersions();

  return res;
};

/**
 * Restituisce il numero della versione maggiore data
 * data una versione
 */
export const getMajorVersion = (version: string): number => {
  return parseInt(version.split(".")[0]);
};
