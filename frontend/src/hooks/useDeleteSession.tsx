import { deleteSession } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SESSIONS_KEY } from "./useSessions";
import { TSession } from "@/lib/types";

const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      // manually filter out the cached data:
      queryClient.setQueryData([SESSIONS_KEY], (cache: TSession[]) =>
        cache.filter((session) => session._id !== sessionId)
      );
      // in order to revalidate the whole cache and refetch all sessions again:
      // queryClient.invalidateQueries([SESSIONS_KEY])
    },
  });

  return {
    deleteSession: mutate,
    ...rest,
  };
};
export default useDeleteSession;
