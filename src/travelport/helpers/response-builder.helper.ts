// cars/providers/travelport/helpers/response-builder.helper.ts

export function mapCarSearchResponse(parsedXml: any): any {
    // const responseBody =
    //     parsedXml['SOAP:Envelope']?.['SOAP:Body']?.['vehicle:VehicleSearchAvailabilityRsp'];

    const responseBody = parsedXml?.SOAPEnvelope?.SOAPBody?.vehicleVehicleSearchAvailabilityRsp

    if (!responseBody || !responseBody?.vehicleVehicle) {
        return {};
    }

    // const vehicleLocations = responseBody?.vehicleVehicleDateLocation?.vehicleVendorLocation;
    const vehicleDateLocations = responseBody?.vehicleVehicleDateLocation;
    const results = responseBody?.vehicleVehicle;
    const vehicles = Array.isArray(results) ? results : [results];

    return { vehicleDateLocations, vehicles };

    // return vehicles.map((result) => ({
    //     ...result,
    //     vehicleLocations: vehicleLocations.filter(vl => vl.VendorCode == result.VendorCode),
    // }));
}

export function mapCarImageResponse(parsedXml: any): Record<string, any> {
    const responseBody = parsedXml?.SOAPEnvelope?.SOAPBody?.vehicleVehicleMediaLinksRsp;

    if (!responseBody || !responseBody?.vehicleVehicleWithMediaItems) {
        return {};
    }

    const results = responseBody?.vehicleVehicleWithMediaItems;
    const vehicles = Array.isArray(results) ? results : [results];

    const vehicleMap: Record<string, any> = {};
    vehicles.forEach((result) => {
        const { VendorCode, AcrissVehicleCode } = result?.vehicleVehicle;
        const key = `${VendorCode}${AcrissVehicleCode}`;
        vehicleMap[key] = {
            // VendorCode,
            // AcrissVehicleCode,
            imgUrl: result?.common_v50_0MediaItem?.url
        };
    });
    return vehicleMap;
}

export function mapCarTypeResponse(item, parsed: any) {

    const vehicleMap: Record<string, any> = {};

    parsed?.SOAPEnvelope?.SOAPBody?.vehicleVehicleKeywordRsp?.common_v50_0Keyword?.common_v50_0Text.forEach((type: any) => {
        const tmp = type.split("/")
        const key = `${item?.VendorCode}${tmp[0]}`;
        vehicleMap[key] = {
            model: tmp[1]?.trim().replace(/\s+/g, ' '),
            bags: tmp[2],
            seats: tmp[3],
        }
    });
    return vehicleMap;
}
