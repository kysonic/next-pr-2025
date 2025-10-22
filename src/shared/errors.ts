import { z } from 'zod';

export interface ZodValidationFieldError {
    field: string;
    message: string;
}

export class ZodValidationError extends Error {
    constructor(
        message: string,
        private errors: ZodValidationFieldError[] = [],
    ) {
        super(message);
        this.name = 'ZodValidationError';
    }

    public getErrors(): ZodValidationFieldError[] {
        return this.errors;
    }
}

export type ValidationSuccess<T> = {
    success: true;
    data: T;
};

export type ValidationError = {
    success: false;
    error: ZodValidationError;
};

export type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

export type InferSchemaType<T extends z.ZodTypeAny> = z.infer<T>;

export const handleZodSchema = async <T extends z.ZodTypeAny>(
    schema: T,
    data: ValidationResult<T>,
): Promise<InferSchemaType<T>> => {
    try {
        const result = await schema.parseAsync(data);

        return result;
    } catch (error) {
        // More control over Zod error
        if (error instanceof z.ZodError) {
            const issues =
                error.issues?.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })) ?? [];
            throw new ZodValidationError('Validation Error', issues);
        }

        throw error;
    }
};
