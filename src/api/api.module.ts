import { Module } from '@nestjs/common';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { TravelportModule } from 'src/travelport/travelport.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TransfersController } from './transfers/transfers.controller';
import { TransfersService } from './transfers/transfers.service';
import { TalixoModule } from 'src/talixo/talixo.module';


@Module({
  controllers: [CarsController, TransfersController],
  providers: [CarsService, TransfersService],
  imports: [
    CacheModule.register({
      ttl: 300000
    }),
    TravelportModule,
    TalixoModule
  ]
})
export class ApiModule { }
