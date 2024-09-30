import AppAlert from "@/components/custom/AppAlert";
import AppLink from "@/components/custom/AppLink";
import FormError from "@/components/custom/FormError";
import H1 from "@/components/custom/H1";
import SubmitButton from "@/components/custom/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendPasswordResetEmail } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
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
            <AppAlert description="Check your inbox for further instructions">
              Email sent!
            </AppAlert>
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
              <FormError>
                {error?.message || "Invalid email or password"}
              </FormError>
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
