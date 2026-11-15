"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_TYPES, validateEvent } from "@/lib/validators";

const emptyValues = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "", // format: YYYY-MM-DD
};

const typeItems = EVENT_TYPES.map((t) => ({ value: t, label: t }));

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-destructive">{message}</p>;
}

export default function EventForm({
  initialValues = emptyValues,
  onSubmit,
  submitLabel = "Save Event",
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);


  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validateEvent(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <Label htmlFor="title">Event title</Label>
        <Input
          id="title"
          className="mt-1.5"
          placeholder="Winter Clothes Distribution"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <FieldError message={errors.title} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={5}
          className="mt-1.5"
          placeholder="Tell volunteers what the event is about and what to bring."
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <FieldError message={errors.description} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="eventType">Event type</Label>
          <Select
            value={values.eventType}
            onValueChange={(v) => v !== null && handleChange("eventType", v)}
            items={typeItems}
          >
            <SelectTrigger id="eventType" className="mt-1.5 w-full">
              <SelectValue placeholder="Choose a type" />
            </SelectTrigger>
            <SelectContent>
              {typeItems.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.eventType} />
        </div>

        <div>
          <Label htmlFor="eventDate">Event date</Label>
          <Input
            id="eventDate"
            type="date"
            className="mt-1.5"
            value={values.eventDate}
            onChange={(e) => handleChange("eventDate", e.target.value)}
          />
          <FieldError message={errors.eventDate} />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          className="mt-1.5"
          placeholder="Mirpur 10, Dhaka"
          value={values.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
        <FieldError message={errors.location} />
      </div>

      <div>
        <Label htmlFor="thumbnail">Thumbnail image URL</Label>
        <Input
          id="thumbnail"
          className="mt-1.5"
          placeholder="https://example.com/photo.jpg"
          value={values.thumbnail}
          onChange={(e) => handleChange("thumbnail", e.target.value)}
        />
        <FieldError message={errors.thumbnail} />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}