import auth, { AuthModel } from "./auth";
import shared, { SharedModel } from "./shared";
import notifications, { NotificationsModel } from "./notifications";
import snackbar, { SnackbarModel } from "./snackbar";
import network, { NetworkModel } from "./network";
import versioning, { VersioningModel } from "./versioning";
import interactions, { InteractionsModel } from "./interactions";

export interface StoreModel {
  auth: AuthModel;
  shared: SharedModel;
  notifications: NotificationsModel;
  snackbar: SnackbarModel;
  network: NetworkModel;
  versioning: VersioningModel;
  interactions: InteractionsModel;
}

const model: StoreModel = {
  auth,
  shared,
  notifications,
  snackbar,
  network,
  versioning,
  interactions,
};

export default model;
