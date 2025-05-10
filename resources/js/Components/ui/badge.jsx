export function Badge({ children, variant = "default", ...props }) {
  let color = "bg-gray-200 text-gray-800";
  if (variant === "success") color = "bg-green-100 text-green-800";
  if (variant === "warning") color = "bg-yellow-100 text-yellow-800";
  if (variant === "destructive") color = "bg-red-100 text-red-800";
  if (variant === "secondary") color = "bg-gray-300 text-gray-700";
  return (
    <span {...props} className={"inline-block px-2 py-1 rounded text-xs font-semibold " + color + " " + (props.className || "") }>
      {children}
    </span>
  );
} 