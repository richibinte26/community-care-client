"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { validateEmail } from "@/lib/validators";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(form.email),
      password: form.password ? "" : "Password is required.",
    };
    setErrors(newErrors);

    const firstError = Object.values(newErrors).find(Boolean);
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: form.email.trim(),
      password: form.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not log you in. Please try again.");
      return;
    }
    toast.success("Welcome back! You are now logged in.");
    router.push("/");
    router.refresh();
  }

  async function handleGithub() {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message || "GitHub login failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-16 md:py-20">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-heading text-3xl">Welcome back</CardTitle>
          <CardDescription>
            Login to create, join and track community events.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />
          </CardContent>
          <CardFooter className="mt-6 flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="flex w-full items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              OR
              <span className="h-px flex-1 bg-border" />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGithub}
            >
              <FaGithub /> Continue with GitHub
            </Button>
            <p className="text-sm text-muted-foreground">
              New to Community Care?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}