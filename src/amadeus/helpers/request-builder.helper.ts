export function buildOfferSearchReq(dto) {
    var travelerIndex = 0;
    return {
        currencyCode: "USD",
        originDestinations: dto.locations,
        // travelers: dto.travelers.map(t => ({ ...t, fareOptions: ["STANDARD"] })),
        travelers: Object.entries(dto.travellersList).flatMap(([key, value]: [string, number]) =>
            Array.from({ length: value }, (_, index) => ({
                id: ++travelerIndex,
                travelerType: key
            }))
        ),
        sources: ["GDS"],
        searchCriteria: {
            //     "maxFlightOffers": 2,
            //     "flightFilters": {
            //         "cabinRestrictions": [
            //             {
            //                 "cabin": "BUSINESS",
            //                 "coverage": "MOST_SEGMENTS",
            //                 "originDestinationIds": [
            //                     "1"
            //                 ]
            //             }
            //         ],
            //         "carrierRestrictions": {
            //             "excludedCarrierCodes": [
            //                 "AA",
            //                 "TP",
            //                 "AZ"
            //             ]
            //         }
            //     }
        }
    };
}