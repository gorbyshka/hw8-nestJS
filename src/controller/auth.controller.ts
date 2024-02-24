import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus
} from '@nestjs/common';

import { AuthService } from '../service/auth.service';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() { userId, roles }: any) {

        try {

            const accessToken = await this.authService.createAccessToken(userId, roles);
            const refreshToken = await this.authService.createRefreshToken(userId);

            return { accessToken, refreshToken };

        } catch (error) { return { error: 'Неправильні дані автентифікації' } }

    }

    @Post('refresh-token')
    async refreshToken(@Body() refreshToken: any) {

        if (!refreshToken) return { error: 'Відсутній refresh токен' };

        try {

            const newAccessToken = await this.authService.refreshAccessToken(refreshToken);

            return { accessToken: newAccessToken };

        } catch (error) { return { error: 'Невірний refresh токен або токен прострочений' } }

    }

}
