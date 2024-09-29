import { FormEvent, useState } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { CircleCheck, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/api";

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
      <h1 className="text-4xl">Change your password</h1>
      {isSuccess ? (
        <div className="rounded-lg shadow-lg p-8 space-y-4 text-center">
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
          <Button
            type="button"
            size="sm"
            variant="link"
            className="p-0"
            asChild
          >
            <Link className="text-blue-500" to="/login">
              Sign in
            </Link>
          </Button>
        </div>
      ) : (
        <form
          className="rounded-lg shadow-lg p-8 space-y-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
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
            <div className="text-red-500">
              {error?.message || "Invalid email or password"}
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={password.length < 8 || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;
