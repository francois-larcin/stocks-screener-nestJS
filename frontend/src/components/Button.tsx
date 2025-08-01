type ButtonColor = "red" | "blue" | "green" | "orange" | "yellow";

type ButtonProps = {
  label: string;
  color?: ButtonColor;
  onClick?: () => void;
};

const colorClasses: Record<ButtonColor, string> = {
  red: "bg-red-400 text-white hover:bg-red-600",
  blue: "bg-blue-500 text-white hover:bg-blue-600",
  green: "bg-green-500 text-white hover:bg-green-600",
  orange: "bg-orange-500 text-white hover:bg-orange-600",
  yellow: "bg-yellow-400 text-black hover:bg-yellow-500",
};

export function Button({ label, color = "blue", onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} py-2 px-4 rounded-lg transition`}
    >
      {label}
    </button>
  );
}
