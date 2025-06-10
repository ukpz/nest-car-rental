import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SearchTransferDto } from './dtos/transfer-search.dto';
import { TransfersService } from './transfers.service';

@Controller('api/transfers')
export class TransfersController {
    constructor(private readonly transferService: TransfersService) { }

    @Post('search')
    @HttpCode(200)
    async searchVehicles(@Body() body: SearchTransferDto) {
        // return body;
        return this.transferService.searchVehicles(body);
    }
}
