import { Action, action, thunk, Thunk } from "easy-peasy";
import { Interaction } from "../../generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LAST_INTERACTION_DATE_STORAGE_KEY = "_lastInteractionDate_";

export interface InteractionsModel {
  interactions: Interaction[];
  replies: { interactionId: string; username: string; createdAt: Date }[];
  addInteraction: Action<InteractionsModel, Interaction>;
  removeInteraction: Action<InteractionsModel, string>;
  addReply: Action<
    InteractionsModel,
    { interactionId: string; username: string }
  >;
  removeReply: Action<InteractionsModel, string>;
  lastInteractionDate?: string | null;
  saveLastInteractionDate: Thunk<InteractionsModel, string | null>;
  setLastInteractionDate: Action<InteractionsModel, string | null>;

  init: Thunk<InteractionsModel, void>;
}

const interactionsModel: InteractionsModel = {
  interactions: [],
  replies: [],
  lastInteractionDate: null,

  addInteraction: action((state, payload) => {
    state.interactions.push(payload);
  }),
  removeInteraction: action((state, id) => {
    state.interactions = state.interactions.filter(
      (interaction) => interaction.id !== id
    );
  }),
  addReply: action((state, payload) => {
    state.replies.push({ ...payload, createdAt: new Date() });
  }),
  removeReply: action((state, id) => {
    state.replies = state.replies.filter((reply) => reply.interactionId !== id);
  }),

  setLastInteractionDate: action((state, payload) => {
    state.lastInteractionDate = payload;
  }),

  saveLastInteractionDate: thunk(async (actions, payload) => {
    actions.setLastInteractionDate(payload);

    if (!payload) {
      await AsyncStorage.removeItem(LAST_INTERACTION_DATE_STORAGE_KEY);
      return;
    }

    await AsyncStorage.setItem(
      LAST_INTERACTION_DATE_STORAGE_KEY,
      String(payload)
    );
  }),

  init: thunk(async (actions, payload) => {
    // Preleva dallo storage la data dell'ultima interazione
    const lastInteractionDate = await AsyncStorage.getItem(
      LAST_INTERACTION_DATE_STORAGE_KEY
    );

    if (!lastInteractionDate) return;

    actions.setLastInteractionDate(lastInteractionDate);
  }),
};

export default interactionsModel;
