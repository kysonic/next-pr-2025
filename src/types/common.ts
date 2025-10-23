export interface ApiResponse {
    success: boolean;
    message?: string;
    total?: number;
}

export interface ApiError {
    errors?: Record<string, { field: string; message: string }>;
}
