import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    async createAccessToken(userId: string, roles: string[]): Promise<string> {

        const payload = { userId, roles };
        return this.jwtService.sign(payload);

    }

    async createRefreshToken(userId: string): Promise<string> {

        const payload = { userId };
        return this.jwtService.sign(payload, { expiresIn: '7d' });

    }

    async refreshAccessToken(refreshToken: string): Promise<string> {

        try {

            const decodedToken = this.jwtService.verify(refreshToken);
            const { userId, roles } = decodedToken;
            const accessToken = await this.createAccessToken(userId, roles);

            return accessToken;

        } catch (error) { throw new Error('Невірний refresh токен або токен прострочений') }

    }

}
