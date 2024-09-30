import AppAlert from "@/components/custom/AppAlert";
import AppLink from "@/components/custom/AppLink";
import ResetPasswordForm from "@/components/custom/ResetPasswordForm";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") || "";
  // const exp = Number(searchParams.get("exp"));
  // const now = Date.now();

  const linkIsValid = true; //code && exp && exp > now;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-md py-12 px-6">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <AppAlert
              variant="destructive"
              description="The link is either invalid or expired."
            >
              Invalid link
            </AppAlert>
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
