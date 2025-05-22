import { Module } from '@nestjs/common';
import { TravelportService } from './travelport.service';

@Module({
    providers: [TravelportService],
    exports:[TravelportService]
})
export class TravelportModule {}
