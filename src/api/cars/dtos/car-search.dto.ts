// src/api/cars/dtos/search-car.dto.ts
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class SearchCarDto {
    @IsString()
    pickupLocation: string;

    @IsString()
    dropoffLocation: string;

    @IsDateString()
    pickupDate: string;

    @IsDateString()
    dropoffDate: string;

    @IsOptional()
    @IsString()
    pickupTime?: string;

    @IsOptional()
    @IsString()
    dropoffTime?: string;

    @IsOptional()
    @IsString()
    driverAge?: string;
}
