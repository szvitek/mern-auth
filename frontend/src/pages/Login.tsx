import AppLink from "@/components/custom/AppLink";
import FormError from "@/components/custom/FormError";
import H1 from "@/components/custom/H1";
import SubmitButton from "@/components/custom/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectUrl = location.state?.redirectUrl || "/";

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, { replace: true });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-md py-12 px-6">
        <H1>Sign into your account</H1>
        <div className="rounded-lg shadow-lg p-8">
          <form className=" space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Your email address</Label>
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
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isError && <FormError>Invalid email or password</FormError>}
            <AppLink
              to="/password/forgot"
              className="block text-right"
              size="sm"
            >
              Forgot password?
            </AppLink>
            <SubmitButton
              isPending={isPending}
              disabled={!email || password.length < 8}
            >
              Sign in
            </SubmitButton>
            <p className="text-center text-xs text-gray-400">
              {"Don't have an account? "}
              <AppLink to="/register" size="sm">
                Sign up
              </AppLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
