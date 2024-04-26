import { Action, action } from "easy-peasy";

export interface NetworkModel {
  isOnline: boolean | null;
  setIsOnline: Action<NetworkModel, boolean | null>;
  // Se si è verificato un periodo offline
  hasBeenOffline?: boolean | null;
  setHasBeenOffline: Action<NetworkModel, boolean | null>;
  // Data in cui l'app si è disconnessa da internet
  disconnectionDate?: Date | null;
  setDisconnectionDate: Action<NetworkModel, Date | null>;
}

const networkModel: NetworkModel = {
  isOnline: null,
  setIsOnline: action((state, isOnline) => {
    state.isOnline = isOnline;
    if (!isOnline) {
      // Imposta la data di disconnessione da internet
      if (!state.disconnectionDate) state.disconnectionDate = new Date();
      state.hasBeenOffline = true;
    }
  }),
  setHasBeenOffline: action((state, hasBeenOffline) => ({
    ...state,
    hasBeenOffline,
  })),
  setDisconnectionDate: action((state, date) => {
    state.disconnectionDate = date;
  }),
};

export default networkModel;
