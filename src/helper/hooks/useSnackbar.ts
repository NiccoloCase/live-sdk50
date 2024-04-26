import { useStoreActions } from "../../store";

export const useSnackbar = () => {
  const openSnack = useStoreActions((actions) => actions.snackbar.open);

  return openSnack;
};
