import { z } from 'zod';

export const emailSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
});

export const passwordSchema = z.object({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(100, 'Password must be less than 100 characters')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            'Password must contain at least one special character',
        ),
});

export const registerSchema = emailSchema.merge(passwordSchema);

export type RegisterSchemaType = z.infer<typeof registerSchema>;
