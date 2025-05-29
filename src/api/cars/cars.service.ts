// src/api/cars/cars.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { TravelportService } from 'src/travelport/travelport.service';
import { SearchCarDto } from './dtos/car-search.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { generateRandomString, makeFilterReference } from './cars.helper';

@Injectable()
export class CarsService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly travelportService: TravelportService
    ) { }

    async searchCars(dto: SearchCarDto) {
        const cacheKey = dto.cacheKey ?? generateRandomString(10);
        const page = dto.page || 1;
        const perPage = dto.perPage || 10;
        const startIndex = (page - 1) * perPage;

        // Try to fetch from cache
        const cached = await this.cacheManager.get<any>(cacheKey);
        if (cached) {
            console.info('data fetched from cache');
            const totalCount = cached.vehicles.length;
            const totalPages = Math.ceil(totalCount / perPage);

            return {
                cacheKey,
                ...cached,
                vehicles: cached.vehicles.slice(startIndex, startIndex + perPage),
                pagination: {
                    totalCount,
                    page,
                    perPage,
                    totalPages,
                },
            };
        }

        // Fallback to API call if cache miss
        const data = await this.travelportService.searchCars(dto);
        this.cacheManager.set(cacheKey, data);
        console.info('data fetched from API');


        // console.log('data.vehicles ',data);
        // return data;

        const filterReference = makeFilterReference(data.vehicles);
        const totalCount = data.vehicles.length;
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            cacheKey,
            ...data,
            filterReference,
            vehicles: data.vehicles.slice(startIndex, startIndex + perPage),
            pagination: {
                totalCount,
                page,
                perPage,
                totalPages,
            },
        };
    }


    async carImages(dto: any) {
        return this.travelportService.carImages(dto);
    }

    async carTypes(dto: any) {
        return this.travelportService.carTypes(dto);
    }
}
