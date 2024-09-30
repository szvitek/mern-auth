import AppLink from "@/components/custom/AppLink";
import H1 from "@/components/custom/H1";
import SubmitButton from "@/components/custom/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendPasswordResetEmail } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";
import { FormEvent, useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordReset(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-md py-12 px-6">
        <H1>Reset password</H1>
        {isSuccess ? (
          <div className="rounded-lg shadow-lg p-8 space-y-4">
            <Alert
              className="mx-auto w-fit flex flex-col items-center justify-center gap-2"
              variant="success"
            >
              <div className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4" />
                <AlertTitle className="mb-0">Email sent!</AlertTitle>
              </div>
              <AlertDescription>
                Check your inbox for further instructions
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form
            className="rounded-lg shadow-lg p-8 space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {isError && (
              <div className="text-red-500 text-center">
                {error?.message || "Invalid email or password"}
              </div>
            )}
            <SubmitButton isPending={isPending} disabled={!email}>
              Reset password
            </SubmitButton>
          </form>
        )}
        <p className="text-center text-xs text-gray-400">
          {"Go back to "}
          <AppLink to="/login" size="sm">
            Sign in
          </AppLink>
          <span> or </span>
          <AppLink to="/register" size="sm">
            Sign up
          </AppLink>
        </p>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
