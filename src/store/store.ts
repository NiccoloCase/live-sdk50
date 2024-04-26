import { createStore, createTypedHooks, useStore } from "easy-peasy";
import model, { StoreModel } from "./models";
import { useEffect, useState } from "react";

export const store = createStore(model);

// TYPESCRIPT
export const { useStoreActions, useStoreDispatch, useStoreState } =
  createTypedHooks<StoreModel>();

/**
 * Hook custom che restituisce una funzione per forzare il re-render di un
 * componente quando lo stato di Easy Peasy viene modificato
 * (bug fix navigazione dopo login/logout)
 */
export const useStoreReRender = () => {
  const store = useStore();
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick((tick) => tick + 1);
    });

    return unsubscribe;
  }, [store]);

  return store.getState();
};
