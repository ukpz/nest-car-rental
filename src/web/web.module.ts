import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { DashboardController } from './dashboard/dashboard.controller';

@Module({
  controllers: [AuthController, DashboardController]
})
export class WebModule {}
