"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function validateProfile(name, image) {
  const errors = {};
  if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  try {
    const url = new URL(image.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("bad protocol");
    }
  } catch {
    errors.image = "Enter a valid photo URL that starts with http:// or https://";
  }
  return errors;
}

function ProfileForm({ user }) {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validateProfile(name, image);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the errors and try again.");
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim(),
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update your profile.");
      return;
    }
    toast.success("Profile updated successfully!");
  }

  return (
    <Card className="mx-auto w-full max-w-lg rounded-2xl">
      <CardHeader className="text-center">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="mx-auto size-24 rounded-full border object-cover"
            />
        ) : (
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-accent font-heading text-3xl font-bold text-primary">
            {(user.name || "U").charAt(0).toUpperCase()}
          </div>
        )}
        <CardTitle className="font-heading text-xl">{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Display name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="image" className="text-sm font-medium">
              Photo URL
            </label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/my-photo.jpg"
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" value={user.email} disabled readOnly />
          </div>

          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mx-auto h-96 max-w-lg animate-pulse rounded-2xl bg-muted" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl md:text-4xl">My Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Update your name and profile photo.
        </p>
      </div>
      <ProfileForm user={session.user} />
    </section>
  );
}