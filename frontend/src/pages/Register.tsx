import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="container flex flex-col min-h-screen justify-center items-center mx-auto">
      <form
        className="rounded-lg shadow-lg p-8 space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl">Create an account</h1>
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
          <p className="text-xs text-gray-400">
            - Must be at least 8 characters long.
          </p>
        </div>
        {isError && (
          <div className="text-red-500">
            {error?.message || "Invalid email or password"}
          </div>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={
            !email ||
            password.length < 8 ||
            isPending ||
            password !== confirmPassword
          }
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Create Account"
          )}
        </Button>
        <p className="text-center text-xs text-gray-400">
          {"Already have an account? "}
          <Button
            type="button"
            size="sm"
            variant="link"
            className="p-0"
            asChild
          >
            <Link to="/login">Sign in</Link>
          </Button>
        </p>
      </form>
    </div>
  );
};
export default RegisterPage;
