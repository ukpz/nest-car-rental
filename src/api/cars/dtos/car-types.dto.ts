import { IsArray, IsISO8601, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class VehicleVendorLocationDto {
    @IsString()
    ProviderCode: string;

    @IsString()
    VendorCode: string;

    @IsString()
    VendorLocationID: string;

    @IsString()
    Key: string;

    @IsString()
    LocationType: string;

    @IsString()
    LocationCode: string;

    @IsString()
    Type: string;
}

class VehicleDateLocationsDto {
    @IsISO8601()
    PickupDateTime: string;

    @IsString()
    PickupLocation: string;

    @IsISO8601()
    ReturnDateTime: string;

    @IsString()
    ReturnLocation: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VehicleVendorLocationDto)
    vehicleVendorLocation: VehicleVendorLocationDto[];
}

export class CarTypesDto {
    @IsObject()
    @ValidateNested()
    @Type(() => VehicleDateLocationsDto)
    vehicleDateLocations: VehicleDateLocationsDto;
}