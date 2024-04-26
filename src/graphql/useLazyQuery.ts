import React from "react";
import { DocumentNode } from "graphql";
import {
  useApolloClient,
  OperationVariables,
  FetchPolicy,
} from "@apollo/react-hooks";

export function useLazyQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  fetchPolicy?: FetchPolicy
) {
  const client = useApolloClient();
  return React.useCallback(
    (variables: TVariables) =>
      client.query<TData, TVariables>({
        query: query,
        variables: variables,
        fetchPolicy,
      }),
    [client]
  );
}
