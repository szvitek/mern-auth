import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email, password });
  };

  return (
    <div className="container flex flex-col min-h-screen justify-center items-center mx-auto">
      <form
        className="rounded-lg shadow-lg p-8 space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl">Sign into your account</h1>
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
        {isError && (
          <div className="text-red-500">Invalid email or password</div>
        )}
        <Button
          type="button"
          variant="link"
          className="block text-right px-0"
          size="sm"
          asChild
        >
          <Link className="text-blue-500" to="/password/forgot">
            Forgot password?
          </Link>
        </Button>
        <Button
          type="submit"
          className="w-full"
          disabled={!email || password.length < 8 || isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Sign in"
          )}
        </Button>
        <p className="text-center text-xs text-gray-400">
          {"Don't have an account? "}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="p-0"
            asChild
          >
            <Link className="text-blue-500" to="/register">
              Sign up
            </Link>
          </Button>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
