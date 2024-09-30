import { FormEvent, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/api";
import H1 from "./H1";
import SubmitButton from "./SubmitButton";
import AppLink from "./AppLink";
import FormError from "./FormError";
import AppAlert from "./AppAlert";

type ResetPasswordFormProps = {
  code: string;
};

export const ResetPasswordForm = ({ code }: ResetPasswordFormProps) => {
  const [password, setPassword] = useState("");

  const {
    isSuccess,
    isError,
    isPending,
    error,
    mutate: resetUserPassword,
  } = useMutation({
    mutationFn: resetPassword,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetUserPassword({ password, verificationCode: code });
  };

  return (
    <>
      <H1>Change your password</H1>
      <div className="rounded-lg shadow-lg p-8 space-y-4">
        {isSuccess ? (
          <>
            <AppAlert>Password updated successfully!</AppAlert>
            <AppLink to="/login" size="sm" className="block text-center">
              Sign in
            </AppLink>
          </>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {isError && (
              <FormError>{error?.message || "An error occured"}</FormError>
            )}
            <SubmitButton isPending={isPending} disabled={password.length < 8}>
              Reset password
            </SubmitButton>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPasswordForm;
