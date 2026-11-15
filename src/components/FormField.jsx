import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormField({ label, name, error, ...props }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} aria-invalid={!!error} {...props} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}