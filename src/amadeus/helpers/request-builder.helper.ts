export function buildOfferSearchReq(dto) {
    return {
        currencyCode: "USD",
        originDestinations: dto.locations,
        travelers: dto.travelers.map(t => ({ ...t, fareOptions: ["STANDARD"] })),
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