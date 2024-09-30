import { getUserMe } from "@/lib/api";
import { TUser } from "@/lib/types";
import { QueryOptions, useQuery, UseQueryResult } from "@tanstack/react-query";

const AUTH_KEY = "auth";

const useAuth = (opts: QueryOptions = {}) => {
  const { data: user, ...rest }: UseQueryResult<TUser> = useQuery({
    queryKey: [AUTH_KEY],
    queryFn: getUserMe,
    staleTime: Infinity,
    ...opts,
  });

  return {
    user,
    ...rest,
  };
};

export default useAuth;
