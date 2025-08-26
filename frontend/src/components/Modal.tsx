import { useEffect } from "react";
import { Button } from "./Button";

export type ModalProps = {
  isOpen: boolean;
  title: string;

  //*Soit passer un message directement
  message?: string;
  //*Soit passer par un children pour contenu custom
  children?: React.ReactNode;

  //*Action des boutons
  primaryLabel?: string;
  cancelLabel?: string;
  primaryFn: () => void | Promise<void>;
  cancelFn: () => void;

  //* Style des boutons
  primaryColor?: "red" | "blue" | "green" | "orange" | "yellow";
  cancelColor?: "red" | "blue" | "green" | "orange" | "yellow";
  btnSize?: "sm" | "md" | "lg";

  //* Intéraction
  disableOverlayClose?: boolean; //* si true, empêche fermeture sur clic overlay
};

export function Modal({
  isOpen,
  title,
  message,
  children,
  primaryLabel = "Confirmer",
  cancelLabel = "Annuler",
  primaryFn,
  cancelFn,
  primaryColor = "blue",
  cancelColor = "yellow",
  btnSize = "md",
  disableOverlayClose = false,
}: ModalProps) {
  //? Fermer avec la touche Escape
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cancelFn();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, cancelFn]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => !disableOverlayClose && cancelFn()}
      />
      {/* Panel */}
      <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h2 id="modal-title" className="text-lg font-semibold mb-3">
          {title}
        </h2>

        {message && <p className="text-sm text-gray-700 mb-4">{message}</p>}
        {children}

        <div className="mt-6 flex gap-3 justify-end">
          <Button
            label={cancelLabel}
            color={cancelColor}
            size={btnSize}
            type="button"
            onClick={cancelFn}
          />
          <Button
            label={primaryLabel}
            color={primaryColor}
            size={btnSize}
            type="button"
            onClick={primaryFn}
          />
        </div>
      </div>
    </div>
  );
}
