import { Module } from '@nestjs/common';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { TravelportModule } from 'src/travelport/travelport.module';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [TravelportModule]
})
export class ApiModule { }
