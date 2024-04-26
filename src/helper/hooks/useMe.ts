import { useWhoamiQuery } from "../../generated/graphql";

export const useMe = (network = false) => {
  const { data: me } = useWhoamiQuery({
    fetchPolicy: network ? "cache-and-network" : "cache-first",
  });
  return me?.whoami;
};
