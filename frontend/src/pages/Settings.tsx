import FormError from "@/components/custom/FormError";
import H1 from "@/components/custom/H1";
import SessionCard from "@/components/custom/SessionCard";
import useSessions from "@/hooks/useSessions";
import { Loader2 } from "lucide-react";

const SettingsPage = () => {
  const { sessions, isPending, isSuccess, isError } = useSessions();
  return (
    <div className="mt-16">
      <H1>My Sessions</H1>
      {isPending && (
        <div className="mt-12 mx-auto w-fit">
          <Loader2 className="animate-spin " />
        </div>
      )}
      {isError && <FormError>Failed to get sessions.</FormError>}
      {isSuccess && (
        <div className="flex flex-col items-start space-y-3">
          {sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SettingsPage;
