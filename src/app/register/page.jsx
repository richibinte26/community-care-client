"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  validateName,
  validateEmail,
  validatePhotoUrl,
  validatePassword,
} from "@/lib/validators";
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

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      photoURL: validatePhotoUrl(form.photoURL),
      password: validatePassword(form.password),
    };
    setErrors(newErrors);

    const firstError = Object.values(newErrors).find(Boolean);
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      image: form.photoURL.trim(),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not create your account. Please try again.");
      return;
    }
    toast.success(`Welcome to Community Care, ${form.name.trim()}!`);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-center px-4 py-16 md:py-20">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-heading text-3xl">Create your account</CardTitle>
          <CardDescription>
            Join Community Care and start helping your neighbourhood.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            <FormField
              label="Name"
              name="name"
              placeholder="Your full name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
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
              label="Photo URL"
              name="photoURL"
              placeholder="https://example.com/my-photo.jpg"
              value={form.photoURL}
              onChange={handleChange}
              error={errors.photoURL}
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />
          </CardContent>
          <CardFooter className="mt-6 flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}