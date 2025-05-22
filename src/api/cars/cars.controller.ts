// src/api/cars/cars.controller.ts
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { SearchCarDto } from './dtos/car-search.dto';
import { CarImageDto } from './dtos/car-image.dto';
import { CarTypesDto } from './dtos/car-types.dto';

@Controller('api/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('search')
  async searchCars(@Query() query: SearchCarDto) {
    return this.carsService.searchCars(query);
  }

  @Post('image')
  @HttpCode(200)
  async getCarsImage(@Body() query: CarImageDto) {
    return this.carsService.carImages(query);
  }

  @Post('types')
  async getCarTypes(@Body() query: CarTypesDto) {
    return this.carsService.carTypes(query);
  }
}
