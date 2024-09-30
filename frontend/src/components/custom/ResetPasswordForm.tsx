import { FormEvent, useState } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { CircleCheck } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/api";
import H1 from "./H1";
import SubmitButton from "./SubmitButton";
import AppLink from "./AppLink";

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
            <Alert
              className="mx-auto w-fit flex flex-col items-center justify-center gap-2"
              variant="success"
            >
              <div className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4" />
                <AlertTitle className="mb-0">
                  Password updated successfully!
                </AlertTitle>
              </div>
            </Alert>
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
              <div className="text-red-500 text-center">
                {error?.message || "An error occured"}
              </div>
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
