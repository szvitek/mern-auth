import { getUserMe } from "@/lib/api";
import { QueryOptions, useQuery } from "@tanstack/react-query";

const AUTH_KEY = "auth";

const useAuth = (opts: QueryOptions = {}) => {
  const { data: user, ...rest } = useQuery({
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
