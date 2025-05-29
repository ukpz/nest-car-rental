import { Module } from '@nestjs/common';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { TravelportModule } from 'src/travelport/travelport.module';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [
    CacheModule.register({
      ttl: 300000
    }),
    TravelportModule,
  ]
})
export class ApiModule { }
