type InputType = "email" | "username" | "password" | "credentials";

type InputProps = {
  type: InputType;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export function Input({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}: InputProps) {
  const htmlType =
    type === "credentials" ? "text" : type === "username" ? "text" : type;

  return (
    <input
      type={htmlType}
      value={value}
      required={required}
      placeholder={placeholder || type}
      onChange={(e) => onChange(e.target.value)}
      className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
}
