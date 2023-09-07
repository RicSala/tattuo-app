export default function Tag({
    bgColor = "bg-primary",
    textColor = "text-primary-foreground",
    children }) {
    return (
        <div
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${bgColor} ${textColor}`}
        >
            {children}
        </div>
    );
}