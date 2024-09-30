import AppLink from "@/components/custom/AppLink";
import FormError from "@/components/custom/FormError";
import H1 from "@/components/custom/H1";
import SubmitButton from "@/components/custom/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAccount({ email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-md py-12 px-6">
        <H1>Create an account</H1>
        <div className="rounded-lg shadow-lg p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              <p className="text-xs text-gray-400">
                - Must be at least 8 characters long.
              </p>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {isError && (
              <FormError>
                {error?.message || "Invalid email or password"}
              </FormError>
            )}
            <SubmitButton
              isPending={isPending}
              disabled={
                !email || password.length < 8 || password !== confirmPassword
              }
            >
              Create Account
            </SubmitButton>
            <p className="text-center text-xs text-gray-400">
              {"Already have an account? "}
              <AppLink to="/login" size="sm">
                Sign in
              </AppLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
