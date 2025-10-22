export interface ApiResponse {
    success: boolean;
    message?: string;
}

export interface ApiError {
    errors?: Record<string, { field: string; message: string }>;
}
