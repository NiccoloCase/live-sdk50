import React from "react";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { ApolloClient, from } from "@apollo/client";

import { GRAPHQL_API } from "../helper/APIs/myApi";
import { cache, cachePersistor } from "./cache";
import {
  authLink,
  offlineLink,
  queueLink,
  serializingLink,
  tokenRefreshLink,
  errorLink,
  httpLink,
} from "./links";

console.log("graphql:", GRAPHQL_API);

cachePersistor
  .restore()
  .catch(() => console.warn("Impossibile recuperare la cache"));

// CLIENT
export const client = new ApolloClient({
  connectToDevTools: true, //!keys.IS_PRODUCTION, // TODO
  link: from([
    tokenRefreshLink as any,
    authLink,
    offlineLink,
    queueLink,
    serializingLink,
    errorLink,
    httpLink,
  ]),
  cache,
  // LOCAL CACHE:
  resolvers: {
    Review: { _hidden: (review) => Boolean(review._hidden) },
    Activity: { _hidden: (activity) => Boolean(activity._hidden) },
  },
  // OPZIONI
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy(lastFetchPolicy) {
        if (
          lastFetchPolicy === "cache-and-network" ||
          lastFetchPolicy === "network-only"
        )
          return "cache-first";
        return lastFetchPolicy;
      },
    },
  },
});

export const ApolloProvider: React.FC<{ children: any }> = ({ children }) => (
  <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
);

/** Pulisce la cache (compresa quella salvata nello storage) */
export const clearCache = () => {
  // Elimina la cache in ram
  client.resetStore();
  // Elimina cache salvata in memoria
  cachePersistor.purge();
};
