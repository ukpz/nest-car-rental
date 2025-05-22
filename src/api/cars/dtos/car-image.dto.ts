import { ArrayNotEmpty, IsArray, IsObject, IsString } from 'class-validator';

export class CarImageDto {
    // @IsString()
    // pickUpLocation: string;

    // @IsString()
    // vendorCodes: string; // e.g., "ZI,ZD,SX"

    @IsArray()
    @ArrayNotEmpty()
    // @IsString({ each: true })
    @IsObject({ each: true })
    vehicleLocations: object[];
}