import { IsDateString, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class SearchTransferDto {

    @IsString()
    start_point: string;

    @IsString()
    end_point: string;

    @IsDateString()
    start_time_date: string;

    @IsString()
    start_time_time: string;

    @IsOptional()
    @IsDateString()
    end_time_date: string;

    @IsString()
    end_time_time?: string;

    @IsOptional()
    @IsString()
    cacheKey?: string

    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    perPage?: number

    @IsOptional()
    @IsString()
    sort?: string

    @IsOptional()
    @IsObject()
    filter?: object
}