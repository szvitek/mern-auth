import useDeleteSession from "@/hooks/useDeleteSession";
import { TSession } from "@/lib/types";
import { Button } from "../ui/button";
import { Loader2, X } from "lucide-react";

type SessionCardProps = {
  session: TSession;
};

const SessionCard = ({ session }: SessionCardProps) => {
  const { _id, createdAt, userAgent, isCurrent } = session;

  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <div className="flex p-3 border border-gray-200 rounded-md w-full">
      <div className="flex-1">
        <p className="font-bold text-sm mb-1">
          {new Date(createdAt).toLocaleString("en-US")}
          {isCurrent && " (current session)"}
        </p>
        <p className="text-gray-500 text-xs">{userAgent}</p>
      </div>
      {!isCurrent && (
        <Button
          size="sm"
          variant="ghost"
          className="ml-4 self-center text-xl text-red-400"
          onClick={() => deleteSession()}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <X />
          )}
        </Button>
      )}
    </div>
  );
};
export default SessionCard;
