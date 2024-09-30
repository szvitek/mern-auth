import AppAlert from "@/components/custom/AppAlert";
import AppLink from "@/components/custom/AppLink";
import { verifyEmail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const VerifyEmailPage = () => {
  const { code } = useParams();

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code || ""),
  });

  return (
    <div className="container mx-auto max-w-md py-4 px-2 text-center">
      <div className="flex flex-col min-h-screen items-center justify-center mt-4">
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="space-y-4">
            {isSuccess ? (
              <AppAlert>Email verified!</AppAlert>
            ) : (
              <AppAlert variant="destructive">Invalid link</AppAlert>
            )}
            {isError && (
              <p>
                The link is either invalid or expired{" "}
                <AppLink to="/password/forgot">Get a new link</AppLink>
              </p>
            )}
            <AppLink to="/">Back to home</AppLink>
          </div>
        )}
      </div>
    </div>
  );
};
export default VerifyEmailPage;
