import { Action, action } from "easy-peasy";
import { User } from "../../generated/graphql";

export interface ChatModel {
  // Se l'app è conessa al server
  conncted: boolean;
  setConncted: Action<ChatModel, boolean>;
  // Data in cui l'app si è disconnessa dal server
  disconnectionDate?: Date | null;
  setDisconnectionDate: Action<ChatModel, Date | null>;
  // Se la barra di ricerca è aperta
  isSerachBarOpen: boolean;
  setIsSerachBarOpen: Action<ChatModel, boolean>;
  // Conversazioni aggiornate con il server
  upToDateConversations: string[];
  setUpToDateConversations: Action<ChatModel, string[]>;
  markConversationAsUpdated: Action<ChatModel, string>;
  // Se la lista di conversazioni è aggiornata
  isConversationsListUpToDate: boolean;
  setIsConversationsListUpToDate: Action<ChatModel, boolean>;
  // Utenti cercati
  foundUsers: User[] | null;
  setFoundUsers: Action<ChatModel, User[] | null>;
  // Gli utenti che stanno scrivendo
  typing: {
    [key: string]: string[];
  };
  addUserTyping: Action<ChatModel, { conversation: string; username: string }>;
  removeUserTyping: Action<
    ChatModel,
    { conversation: string; username: string }
  >;
}

const chatModel: ChatModel = {
  conncted: false,
  typing: {},
  foundUsers: [],
  isSerachBarOpen: false,
  upToDateConversations: [],
  isConversationsListUpToDate: false,

  /** Imposta se l'app è conessa al server */
  setConncted: action((state, conncted) => {
    state.conncted = conncted;
  }),

  /** Imposta il valore della data di disconessione dal server*/
  setDisconnectionDate: action((state, date) => {
    state.disconnectionDate = date;
  }),

  /** Imposta l'array di untenti trovati nella ricerca */
  setFoundUsers: action((state, foundUser) => {
    state.foundUsers = foundUser;
  }),

  /** Apre/chiude la barra di ricerca */
  setIsSerachBarOpen: action((state, isOpen) => {
    state.isSerachBarOpen = isOpen;
  }),

  /** Aggiunge un nuovo utente alla lista di utenti che stanno scrivendo */
  addUserTyping: action((state, { conversation, username }) => {
    const array = state.typing[conversation];
    if (!array || array.indexOf(username) === -1) {
      if (array) state.typing[conversation].push(username);
      else state.typing[conversation] = [username];
    }
  }),

  /** Rimuove un nuovo utente alla lista di utenti che stanno scrivendo */
  removeUserTyping: action((state, { conversation, username }) => {
    const array = state.typing[conversation];
    if (!array) return;
    state.typing[conversation] = state.typing[conversation].filter(
      (u) => u !== username
    );
  }),

  /** Imposta l'array della conversazioni aggiornate */
  setUpToDateConversations: action((state, conversations) => {
    state.upToDateConversations = conversations;
  }),

  /** Contrassegna una conversazione come aggiornata */
  markConversationAsUpdated: action((state, conversationId) => {
    if (state.upToDateConversations.indexOf(conversationId) === -1)
      state.upToDateConversations.push(conversationId);
  }),
  /** Se la lista di conversazioni è aggiornata */
  setIsConversationsListUpToDate: action((state, value) => {
    state.isConversationsListUpToDate = value;
  }),
};

export default chatModel;
