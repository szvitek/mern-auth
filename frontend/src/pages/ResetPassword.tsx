import AppLink from "@/components/custom/AppLink";
import ResetPasswordForm from "@/components/custom/ResetPasswordForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();

  const linkIsValid = code && exp && exp > now;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-md py-12 px-6">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Alert
              className="mx-auto w-fit flex flex-col items-center justify-center gap-2"
              variant="destructive"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="mb-0">Invalid link</AlertTitle>
              </div>
              <AlertDescription>
                The link is either invalid or expired.
              </AlertDescription>
            </Alert>

            <AppLink to="/password/forgot" size="sm">
              Request a new password reset link
            </AppLink>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResetPasswordPage;
