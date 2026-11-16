export function validateName(name) {
  if (!name.trim()) return "Name is required.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
}

export function validateEmail(email) {
  if (!email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return "";
}

export function validatePhotoUrl(url) {
  if (!url.trim()) return "Photo URL is required.";
  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "Photo URL must start with http:// or https://";
    }
  } catch {
    return "Please enter a valid photo URL.";
  }
  return "";
}

export function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must have a lowercase letter.";
  return "";
}

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Drive",
  "Education",
  "Health Camp",
  "Food Distribution",
  "Other",
];

export function getTodayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export function validateEvent(values) {
  const errors = {};

  const title = values.title.trim();
  if (!title) errors.title = "Title is required.";
  else if (title.length < 5) errors.title = "Title must be at least 5 characters.";
  else if (title.length > 100) errors.title = "Title must be 100 characters or less.";

  const description = values.description.trim();
  if (!description) errors.description = "Description is required.";
  else if (description.length < 20)
    errors.description = "Description must be at least 20 characters.";
  else if (description.length > 1000)
    errors.description = "Description must be 1000 characters or less.";

  if (!values.eventType) errors.eventType = "Please choose an event type.";
  else if (!EVENT_TYPES.includes(values.eventType))
    errors.eventType = "Please choose a valid event type.";

  if (!values.thumbnail.trim()) {
    errors.thumbnail = "Thumbnail image URL is required.";
  } else {
    try {
      const url = new URL(values.thumbnail.trim());
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.thumbnail = "Image URL must start with http:// or https://";
      }
    } catch {
      errors.thumbnail = "Please enter a valid image URL.";
    }
  }

  if (values.location.trim().length < 3)
    errors.location = "Location must be at least 3 characters.";

  if (!values.eventDate) errors.eventDate = "Event date is required.";
  else if (values.eventDate < getTodayString())
    errors.eventDate = "Event date must be today or a future date.";

  return errors;
}