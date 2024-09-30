import { getSessions } from "@/lib/api";
import { TSession } from "@/lib/types";
import { QueryOptions, useQuery, UseQueryResult } from "@tanstack/react-query";

export const SESSIONS_KEY = "sessions";

const useSessions = (opts: QueryOptions = {}) => {
  const { data: sessions = [], ...rest }: UseQueryResult<TSession[]> = useQuery(
    {
      queryKey: [SESSIONS_KEY],
      queryFn: getSessions,
      ...opts,
    }
  );

  return {
    sessions,
    ...rest,
  };
};
export default useSessions;
