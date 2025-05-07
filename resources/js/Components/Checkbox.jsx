export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-blue-800 shadow-sm focus:ring-blue-800 ' +
                className
            }
        />
    );
}
