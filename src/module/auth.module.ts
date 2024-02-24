import {
    MiddlewareConsumer,
    Module,
    NestModule
} from '@nestjs/common';

import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { JwtModule } from '@nestjs/jwt';

import { notFoundMiddleware } from 'src/middleware/notFoundMiddleware.middleware';

@Module({

    imports: [

        JwtModule.registerAsync({

            useFactory: () => ({

                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '15m' },

            }),

        }),

    ],

    controllers: [AuthController],
    providers: [AuthService],

})

export class AuthModule implements NestModule {

    configure(consumer: MiddlewareConsumer) { consumer.apply(notFoundMiddleware).forRoutes('*') }

}
