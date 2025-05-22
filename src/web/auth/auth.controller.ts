// web/auth.controller.ts
import { Controller, Get, Post, Render } from '@nestjs/common';

@Controller('admin')
export class AuthController {
    @Get('login')
    @Render('login')
    getLogin() {
        return { title: 'Admin Login' };
    }

    @Post('login')
    login() {
        // TODO: handle login
    }
}
