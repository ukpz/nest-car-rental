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

export function mapCarImageResponse(parsedXml: any): any[] {
    const responseBody = parsedXml?.SOAPEnvelope?.SOAPBody?.vehicleVehicleMediaLinksRsp;

    if (!responseBody || !responseBody?.vehicleVehicleWithMediaItems) {
        return [];
    }

    const results = responseBody?.vehicleVehicleWithMediaItems;
    const vehicles = Array.isArray(results) ? results : [results];

    return vehicles.map((result) => {
        const { VendorCode, AcrissVehicleCode } = result?.vehicleVehicle;
        return {
            VendorCode,
            AcrissVehicleCode,
            imgUrl: result?.common_v50_0MediaItem?.url
        }
    });

}

export function mapCarTypeResponse(item, parsed: any) {
    return parsed?.SOAPEnvelope?.SOAPBody?.vehicleVehicleKeywordRsp?.common_v50_0Keyword?.common_v50_0Text.map((type: any) => {
        const tmp = type.split("/")
        return {
            VendorCode: item?.VendorCode,
            AcrissVehicleCode: tmp[0],
            model: tmp[1],
            seats: tmp[2],
            bags: tmp[3],
        }
    });
}
