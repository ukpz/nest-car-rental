// src/api/cars/dtos/search-car.dto.ts
import { IsString, IsDateString, IsOptional, IsObject, IsNumber } from 'class-validator';

export class SearchCarDto {
    @IsString()
    pickupLocation: string;

    @IsString()
    dropoffLocation: string;

    @IsDateString()
    pickupDate: string;

    @IsDateString()
    dropoffDate: string;

    @IsString()
    pickupTime?: string;

    @IsString()
    dropoffTime?: string;

    @IsOptional()
    @IsString()
    driverAge?: string;

    @IsOptional()
    @IsString()
    cacheKey?:string

    @IsNumber()
    page?:number

    @IsOptional()
    @IsNumber()
    perPage?:number

    @IsOptional()
    @IsString()
    sort?:string

    @IsOptional()
    @IsObject()
    filter?:object

}
