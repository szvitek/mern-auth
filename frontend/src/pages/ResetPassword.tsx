import ResetPasswordForm from "@/components/custom/ResetPasswordForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();

  const linkIsValid = code && exp && exp > now;

  return (
    <div className="container flex flex-col min-h-screen justify-center items-center mx-auto">
      {linkIsValid ? (
        <ResetPasswordForm code={code} />
      ) : (
        <>
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

          <Button
            type="button"
            size="sm"
            variant="link"
            className="p-0"
            asChild
          >
            <Link className="text-blue-500" to="/password/forgot">
              Request a new password reset link
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};
export default ResetPasswordPage;
