// src/api/cars/cars.controller.ts
import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { SearchCarDto } from './dtos/car-search.dto';
import { CarImageDto } from './dtos/car-image.dto';
import { CarTypesDto } from './dtos/car-types.dto';

@Controller('api/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('search')
  @HttpCode(200)
  async searchCars(@Body() body: SearchCarDto) {
    return this.carsService.searchCars(body);
  }

  @Post('image')
  @HttpCode(200)
  async getCarsImage(@Body() body: CarImageDto) {
    return this.carsService.carImages(body);
  }

  @Post('types')
  async getCarTypes(@Body() body: CarTypesDto) {
    return this.carsService.carTypes(body);
  }
}
