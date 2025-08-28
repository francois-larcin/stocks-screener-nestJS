import { useState } from "react";
import { Button } from "./Button";

type FormProps = {
  title: string;
  onSubmit: () => void | Promise<void>;
  children: React.ReactNode;
  submitLabel: string;
  submitColor?:
    | "red"
    | "blue"
    | "green"
    | "orange"
    | "yellow"
    | "bull"
    | "bear"
    | "neutral";
};

export function Form({
  title,
  submitLabel,
  onSubmit,
  children,
  submitColor = "blue",
}: FormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await onSubmit();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-xl w-80 mx-auto"
    >
      <h2 className="text-xl font-bold text-center">{title}</h2>

      {children}

      {error && <p className="text-center text-red-500 text-sm">{error}</p>}

      <Button label={submitLabel} color={submitColor} type="submit" fullWidth />
    </form>
  );
}
