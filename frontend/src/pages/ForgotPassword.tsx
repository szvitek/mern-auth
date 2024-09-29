import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendPasswordResetEmail } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { CircleCheck, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="container flex flex-col min-h-screen justify-center items-center mx-auto">
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
          <h1 className="text-4xl">Reset password</h1>
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
            <div className="text-red-500">
              {error?.message || "Invalid email or password"}
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={!email || isPending}
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
      <p className="text-center text-xs text-gray-400">
        {"Go back to "}
        <Button type="button" size="sm" variant="link" className="p-0" asChild>
          <Link className="text-blue-500" to="/login">
            Sign in
          </Link>
        </Button>
        <span> or </span>
        <Button type="button" size="sm" variant="link" className="p-0" asChild>
          <Link className="text-blue-500" to="/register">
            Sign up
          </Link>
        </Button>
      </p>
    </div>
  );
};
export default ForgotPasswordPage;
