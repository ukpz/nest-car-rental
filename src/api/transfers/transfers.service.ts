import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TalixoService } from 'src/talixo/talixo.service';
import { applyFilters, applySorting, generateRandomString, makeFilterReference } from './transfers.helper';

@Injectable()
export class TransfersService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly talixoService: TalixoService
    ) { }

    async searchVehicles(dto) {
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
            data = await this.talixoService.search(dto);
            await this.cacheManager.set(cacheKey, data);
            console.info('Data fetched from API');
        }

        // 3. Apply filters and sorting
        let { limousines: originalVehicles, ...rest } = data;
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
        const paginatedVehicles = vehicles.slice(startIndex, startIndex + perPage);

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
            ...(fromCache ? {} : { filterReference: await makeFilterReference(data) }),
        };
        // return this.talixoService.search(dto);
    }
}
