import { Operation } from "@apollo/client";
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common";
import { isPlainObject, isArray } from "lodash";
import { Reference, FieldPolicy } from "@apollo/client";

/**
 * Crea una copia dell'oggetto passato rimuovendo le defunzione dei tipi graphql
 * @param obj
 * @returns
 */
export default function cloneWithoutTypename<T>(obj: T): Omit<T, "__typename"> {
  if (!isPlainObject(obj)) {
    return obj;
  }
  let result: any = {};
  for (let key in obj) {
    if (key === "__typename") {
      continue;
    }
    let value = (obj as any)[key];
    if (isPlainObject(value)) {
      result[key] = cloneWithoutTypename(value);
    } else if (isArray(value)) {
      result[key] = value.map(cloneWithoutTypename);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Verifica se l'operazione è una mutazione
 * @param operation
 * @returns
 */
export const isMutationOperation = (operation: Operation) => {
  return (
    operation.query.definitions.filter((e: any) => e.operation === "mutation")
      .length > 0
  );
};

/**
 * Restituisce il numero di elementi che separano il primo elemento dell'array al cursore
 * @param items
 * @param cursor
 * @param readField
 * @returns
 */
export const getOffsetFromCursor = (
  items: any[],
  cursor: any,
  readField: ReadFieldFunction
) => {
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];
    if (readField("id", item) === cursor) return i + 1;
  }
  return items.length;
};

type KeyArgs = FieldPolicy<any>["keyArgs"];

/** Implementazione impaginazione con cursore */
export const cursorPagination = <T = Reference>(
  keyArgs: KeyArgs = []
): FieldPolicy<T[]> => ({
  keyArgs,
  merge(existing, incoming, { args, readField }) {
    const newItems: any = {};

    if (!incoming || !Array.isArray(incoming)) return existing;

    incoming.forEach(
      (item: any) => (newItems[readField("id", item) as any] = item)
    );
    // Se è in arrivo un oggetto

    //newItems[readField("id", incoming) as any] = incoming

    const x = args?.pagination?.cursor
      ? { ...existing, ...newItems }
      : newItems;
    return x;
  },
  read(existing) {
    return existing && Object.values(existing);
  },
});

/** Implementazione impaginazione con cursore */
export const cursorPaginationV2 = <T = Reference>(
  keyArgs: KeyArgs = []
): FieldPolicy<{
  items: T[];
  endReached?: boolean;
  cursor?: string | null;
}> => ({
  keyArgs,
  // merge(existing, incoming, { args, readField }) {
  //   const newItems: any = {};

  //   incoming.items.forEach(
  //     (item: any) => (newItems[readField("id", item) as any] = item)
  //   );

  //   const result = {
  //     items: args?.pagination?.cursor
  //       ? { ...existing?.items, ...newItems }
  //       : newItems,
  //     endReached: incoming.endReached,
  //     cursor: incoming.cursor,
  //   };
  //   //console.log({ result });

  //   return result;
  // },
  // read(existing) {
  //   const result = {
  //     items: existing?.items ? (Object.values(existing.items) as any) : [],
  //     endReached: existing ? existing?.endReached : false,
  //     cursor: existing?.cursor,
  //   };
  //   //console.log("existing read", existing);
  //   //console.log({ result });
  //   return result;
  // },

  merge(existing, incoming, { readField, args }) {
    const items: { [key: string]: any } = existing
      ? // && args?.pagination.cursor
        { ...existing.items }
      : {};

    console.log("NEW MERGE");

    console.log("EXISITNG", Object.values(items).length);
    console.log("INCOMING", incoming.items.length);

    incoming?.items?.forEach((item: any) => {
      items[readField("id", item) as any] = item;
    });

    console.log("MERGED", Object.values(items).length);

    return {
      cursor: incoming?.cursor,
      items: items as any,
      endReached: incoming?.endReached,
    };
  },

  read(existing) {
    if (existing) {
      return {
        cursor: existing.cursor,
        items: Object.values(existing.items),
        endReached: existing.endReached,
      };
    }
  },
});

/** Implementazione impaginazione con offset/limit */
export const offsetPagination = <T = Reference>(
  keyArgs: KeyArgs = []
): FieldPolicy<T[]> => ({
  keyArgs,
  merge(existing, incoming, { args }) {
    const offset = args?.pagination?.offset || 0;
    if (offset === 0) return incoming;
    const merged = existing ? existing.slice(0) : [];
    for (let i = 0; i < incoming.length; ++i) merged[offset + i] = incoming[i];
    return merged;
  },
});

export const removeTypename = <T>(obj: T): Omit<T, "__typename"> => {
  if (obj && (obj as any).__typename) {
    delete (obj as any).__typename;
  }
  return obj;
};
