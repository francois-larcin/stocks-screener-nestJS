import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<FontAwesomeIcon icon={["fas", "trash-can"]} />;
<FontAwesomeIcon icon={["far", "heart"]} />;

type ButtonColor =
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "yellow"
  | "bull"
  | "bear"
  | "neutral";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  label: React.ReactNode; //? Autoriser format JSX pour les icônes
  color?: ButtonColor;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  to?: string; //* Permet la navigation
  title?: string; //* Accessibilité
  ariaLabel?: string; //* Accessibilité
};

const colorClasses: Record<ButtonColor, string> = {
  red: "bg-red-400 text-white hover:bg-red-600",
  blue: "bg-blue-500 text-white hover:bg-blue-600",
  green: "bg-green-500 text-white hover:bg-green-600",
  orange: "bg-orange-500 text-white hover:bg-orange-600",
  yellow: "bg-yellow-400 text-black hover:bg-yellow-500",
  bull: "bg-green-900 text-white hover:bg-green-800",
  bear: "bg-red-900 text-white hover:bg-red-800",
  neutral: "bg-slate-600 text-white hover:bg-slate-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
};

export function Button({
  label,
  color = "blue",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  to,
  title,
  ariaLabel,
}: ButtonProps) {
  const classes = `
    ${colorClasses[color]}
    ${sizeClasses[size]}
    rounded-lg transition
    inline-flex items-center justify-center gap-2
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  if (to) {
    return (
      <Link to={to} className={classes} title={title} aria-label={ariaLabel}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      title={title}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
}
