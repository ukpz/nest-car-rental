import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { generateRandomString } from './flights.helper';

@Injectable()
export class FlightsService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private amadeusService: AmadeusService
    ) { }

    async search(dto) {
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
            data = await this.amadeusService.search(dto);
            await this.cacheManager.set(cacheKey, data);
            console.info('Data fetched from API');
        }

        // 3. Apply filters and sorting
        let { data: originalFlights, ...rest } = data;
        let flights = [...originalFlights]; // clone to avoid mutating original data

        // if (dto.filter) {
        //     vehicles = applyFilters(vehicles, dto.filter);
        // }

        // if (dto.sort) {
        //     vehicles = applySorting(vehicles, dto.sort);
        // }

        // 4. Pagination
        const totalCount = flights.length;
        const totalPages = Math.ceil(totalCount / perPage);
        const paginatedFlights = flights.slice(startIndex, startIndex + perPage);

        // 5. Build response
        return {
            cacheKey,
            flights: paginatedFlights,
            pagination: {
                totalCount,
                page,
                perPage,
                totalPages,
            },
            // ...(fromCache ? {} : { filterReference: await makeFilterReference(data) }),
        };
    }
}
