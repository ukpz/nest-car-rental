// src/api/cars/cars.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { TravelportService } from 'src/travelport/travelport.service';
import { SearchCarDto } from './dtos/car-search.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { generateRandomString, makeFilterReference, applySorting, applyFilters } from './cars.helper';

@Injectable()
export class CarsService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly travelportService: TravelportService
    ) { }

    // async searchCars(dto: SearchCarDto) {
    //     const cacheKey = dto.cacheKey ?? generateRandomString(10);
    //     const page = dto.page || 1;
    //     const perPage = dto.perPage || 10;
    //     const startIndex = (page - 1) * perPage;

    //     // Try to fetch from cache
    //     const cached = await this.cacheManager.get<any>(cacheKey);
    //     if (cached) {
    //         console.info('data fetched from cache');
    //         const totalCount = cached.vehicles.length;
    //         const totalPages = Math.ceil(totalCount / perPage);

    //         return {
    //             cacheKey,
    //             // ...cached,
    //             vehicles: cached.vehicles.slice(startIndex, startIndex + perPage),
    //             pagination: {
    //                 totalCount,
    //                 page,
    //                 perPage,
    //                 totalPages,
    //             },
    //         };
    //     }

    //     // Fallback to API call if cache miss
    //     const data = await this.travelportService.searchCars(dto);
    //     this.cacheManager.set(cacheKey, data);
    //     console.info('data fetched from API');

    //     const filterReference = makeFilterReference(data.vehicles);
    //     const totalCount = data.vehicles.length;
    //     const totalPages = Math.ceil(totalCount / perPage);

    //     return {
    //         cacheKey,
    //         ...data,
    //         filterReference,
    //         vehicles: data.vehicles.slice(startIndex, startIndex + perPage),
    //         pagination: {
    //             totalCount,
    //             page,
    //             perPage,
    //             totalPages,
    //         },
    //     };
    // }

    async searchCars(dto: SearchCarDto) {
        console.log('searching cars ---------------------------------------------------------');

        const cacheKey = dto.cacheKey ?? generateRandomString(10);
        const page = dto.page || 1;
        const perPage = dto.perPage || 10;
        const startIndex = (page - 1) * perPage;

        let data: any;
        let fromCache = false;

        // 1. Try to fetch from cache
        const cached = await this.cacheManager.get<any>(cacheKey);
        if (cached) {
            data = cached;
            fromCache = true;
            console.info('Data fetched from cache');
        } else {
            // 2. Fallback to API call and cache the result
            data = await this.travelportService.searchCars(dto);
            await this.cacheManager.set(cacheKey, data);
            console.info('Data fetched from API');
        }

        // 3. Apply filters and sorting
        let { vehicles: originalVehicles, ...rest } = data;
        let vehicles = [...originalVehicles]; // clone to avoid mutating original data

        if (dto.filter) {
            vehicles = applyFilters(vehicles, dto.filter);
        }

        if (dto.sort) {
            vehicles = applySorting(vehicles, dto.sort);
        }

        // 4. Pagination
        const totalCount = vehicles.length;
        const totalPages = Math.ceil(totalCount / perPage);
        const paginatedVehicles = vehicles.slice(startIndex, startIndex + perPage).map((item) => {
            const rate = item?.vehicleVehicleRate?.vehicleSupplierRate?.EstimatedTotalAmount;
            item.sellPrice = parseFloat(rate.match(/[\d.]+/)) ?? 0.0;
            item.vendorLogo = `http://192.168.1.15:3000/asset/vendor_logo/${item.VendorCode}.png`
            return item;
        });

        // 5. Build response
        return {
            cacheKey,
            vehicles: paginatedVehicles,
            pagination: {
                totalCount,
                page,
                perPage,
                totalPages,
            },
            ...(fromCache ? {} : { ...rest, filterReference: makeFilterReference(originalVehicles) }),
        };
    }

    async carImages(dto: any) {
        return this.travelportService.carImages(dto);
    }

    async carTypes(dto: any) {
        return this.travelportService.carTypes(dto);
    }
}
