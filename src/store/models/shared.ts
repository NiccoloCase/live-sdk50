import { Action, action } from "easy-peasy";

export interface SharedModel {
  bannedUsers: string[];
  addBannedUser: Action<SharedModel, string>;
}

const sharedModel: SharedModel = {
  bannedUsers: [],
  addBannedUser: action((state, id) => {
    state.bannedUsers = [...state.bannedUsers, id];
  }),
};

export default sharedModel;
