import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { SearchFlightDto } from './dtos/flight-search.dto';

@Controller('api/flights')
export class FlightsController {
    constructor(
        private flightService: FlightsService
    ) { }

    @Post('search')
    @HttpCode(200)
    async searchFlights(@Body() dto: SearchFlightDto) {
        // return dto;
        return this.flightService.search(dto);
    }
}
