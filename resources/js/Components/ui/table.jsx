export function Table({ children, ...props }) {
  return <table {...props} className={"min-w-full " + (props.className || "")}>{children}</table>;
}

export function TableHeader({ children, ...props }) {
  return <thead {...props}>{children}</thead>;
}

export function TableBody({ children, ...props }) {
  return <tbody {...props}>{children}</tbody>;
}

export function TableRow({ children, ...props }) {
  return <tr {...props}>{children}</tr>;
}

export function TableHead({ children, ...props }) {
  return <th {...props} className={"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider " + (props.className || "")}>{children}</th>;
}

export function TableCell({ children, ...props }) {
  return <td {...props} className={"px-6 py-4 whitespace-nowrap text-sm text-gray-500 " + (props.className || "")}>{children}</td>;
} 