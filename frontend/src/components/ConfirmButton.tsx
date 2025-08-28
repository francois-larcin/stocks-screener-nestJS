import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<FontAwesomeIcon icon={["fas", "trash-can"]} />;
<FontAwesomeIcon icon={["fas", "arrows-spin"]} />;

type ConfirmButtonProps = {
  label: React.ReactNode; //? Autoriser format JSX pour les icônes
  color?: "red" | "blue" | "green" | "orange" | "yellow";
  size?: "sm" | "md" | "lg";
  title: string;
  message?: string;
  onConfirm: () => void | Promise<void>;
};

export function ConfirmButton({
  label,
  color = "blue",
  size = "md",
  title,
  message,
  onConfirm,
}: ConfirmButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label={label}
        color={color}
        size={size}
        onClick={() => setOpen(true)}
      />
      <Modal
        isOpen={open}
        title={title}
        message={message}
        primaryLabel="Oui"
        cancelLabel="Non"
        primaryColor={color}
        cancelColor="yellow"
        primaryFn={async () => {
          await onConfirm();
          setOpen(false);
        }}
        cancelFn={() => setOpen(false)}
      />
    </>
  );
}
