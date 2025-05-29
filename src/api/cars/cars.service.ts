// src/api/cars/cars.service.ts
import { Injectable } from '@nestjs/common';
import { TravelportService } from 'src/travelport/travelport.service';
import { SearchCarDto } from './dtos/car-search.dto';
import axios from 'axios';

@Injectable()
export class CarsService {
    constructor(private readonly travelportService: TravelportService) { }

    async searchCars(dto: SearchCarDto) {
        return this.travelportService.searchCars(dto);
    }

    async carImages(dto: any) {
        return this.travelportService.carImages(dto);
    }

    async carTypes(dto: any) {
        return this.travelportService.carTypes(dto);
    }  
}
