// src/api/cars/cars.service.ts
import { Injectable } from '@nestjs/common';
import { TravelportService } from 'src/travelport/travelport.service';
import { SearchCarDto } from './dtos/car-search.dto';
import axios from 'axios';

@Injectable()
export class CarsService {
    constructor(private readonly travelportService: TravelportService) { }

    async expediaLocationCall(query: any) {
        const url = `https://www.expedia.com/api/v4/typeahead/${encodeURIComponent(query)}?client=Homepage&dest=true&expuserid=-1&features=postal_code|consistent_display|cars_rental|carsclickpopularity|google&lob=CARS&locale=en_US&maxresults=8&regiontype=1583&guid=bffdb692-8c87-4ad3-b254-90bf4238bb22&siteid=1&ab=42716.0&personalize=true`;

        const headers = {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Referer': 'https://revised-altabooking.vercel.app/',
            'Sec-Ch-Ua':
                '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
        };
        const response = await axios.get(url, { headers });
        return response.data?.sr;
    }

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
