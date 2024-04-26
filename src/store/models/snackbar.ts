import { Action, action } from "easy-peasy";

export interface SnackbarModel {
  isOpen: boolean;
  message?: string | null;
  open: Action<SnackbarModel, { message: string }>;
  close: Action<SnackbarModel>;
}

const snackbarModel: SnackbarModel = {
  isOpen: false,
  message: null,

  open: action((state, payload) => {
    state.isOpen = true;
    state.message = payload.message;
  }),

  close: action((state) => {
    state.isOpen = false;
    state.message = null;
  }),
};

export default snackbarModel;
