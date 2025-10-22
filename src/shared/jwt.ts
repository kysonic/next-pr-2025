import jwt from 'jsonwebtoken';
import { config } from '@/shared/config';

export interface JwtPayload {
    userId: string;
    email: string;
    role?: string;
}

export class JwtService {
    constructor(
        private readonly secret: string,
        private readonly expiresIn: number,
    ) {}

    generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn,
            issuer: config.appName,
        });
    }

    verifyToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.secret) as JwtPayload;
        } catch (error) {
            throw new Error('Invalid or expired token...');
        }
    }

    decodeToken(token: string): JwtPayload | null {
        try {
            return jwt.decode(token) as JwtPayload;
        } catch {
            return null;
        }
    }
}

export const jwtService = new JwtService(
    process.env.JWT_SECRET,
    config.auth.token.expiresIn,
);
