import AppLink from "@/components/custom/AppLink";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { verifyEmail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, CircleCheck, Loader2 } from "lucide-react";
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
          <Loader2 />
        ) : (
          <div className="space-y-4">
            <Alert
              className="mx-auto w-fit flex items-center justify-center gap-2"
              variant={isSuccess ? "success" : "destructive"}
            >
              <span>
                {isSuccess ? (
                  <CircleCheck className="h-4 w-4 " />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
              </span>
              <AlertTitle className="mb-0">
                {isSuccess ? "Email verified!" : "Invalid link"}
              </AlertTitle>
            </Alert>
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
