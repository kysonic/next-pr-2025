export interface ErrorFieldProps {
    error?: string;
}

function ErrorField({ error }: ErrorFieldProps) {
    return <div className="flex h-2 text-red-600 pt-1 text-xs">{error}</div>;
}

export default ErrorField;
