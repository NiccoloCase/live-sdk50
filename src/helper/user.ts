import { UserStatistics, WhoamiDocument } from "../generated/graphql";
import { cache } from "../graphql/cache";

export const updateGraphqlCachedUserStats = (
  stats: Partial<UserStatistics>
) => {
  const whoami: any = cache.readQuery({
    query: WhoamiDocument,
  });

  if (whoami?.whoami) {
    const newStats: { [key: string]: number } = { ...whoami.whoami.stats };

    Object.keys(whoami.whoami.stats).forEach((key) => {
      const inc = (stats as any)[key] || 0;
      newStats[key] = whoami.whoami.stats[key] + inc;
    });

    console.log({ newStats });

    cache.writeQuery({
      query: WhoamiDocument,
      data: {
        whoami: {
          ...whoami.whoami,
          stats: newStats,
        },
      },
    });
  }
};
