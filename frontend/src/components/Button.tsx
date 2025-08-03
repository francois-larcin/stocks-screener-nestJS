import { Link } from "react-router-dom";

type ButtonColor = "red" | "blue" | "green" | "orange" | "yellow";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  label: string;
  color?: ButtonColor;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  to?: string; //* Permet la navigation
};

const colorClasses: Record<ButtonColor, string> = {
  red: "bg-red-400 text-white hover:bg-red-600",
  blue: "bg-blue-500 text-white hover:bg-blue-600",
  green: "bg-green-500 text-white hover:bg-green-600",
  orange: "bg-orange-500 text-white hover:bg-orange-600",
  yellow: "bg-yellow-400 text-black hover:bg-yellow-500",
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
}: ButtonProps) {
  const classes = `
        ${colorClasses[color]}
        ${sizeClasses[size]}
        rounded-lg transition
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  //* Si to === true alors on rend un <Link> sinon un <button>

  if (to) {
    return (
      <Link to={to} className={classes}>
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
    >
      {label}
    </button>
  );
}
