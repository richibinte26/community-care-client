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