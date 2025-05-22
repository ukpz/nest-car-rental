// web/dashboard.controller.ts
import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class DashboardController {
    @Get('dashboard')
    @Render('dashboard')
    getDashboard() {
        return { title: 'Dashboard' };
    }
}
