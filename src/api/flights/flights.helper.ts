export function generateRandomString(length: number) {
    return Array.from({ length }, () =>
        Math.random().toString(36)[2]
    ).join('');
}

function timeFromDateStr(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours(); // 5
    const minutes = date.getMinutes(); // 55
    return `${hours}:${minutes}`
}

export function modifiedList(paginatedFlights, rest) {
    return paginatedFlights.map(flight => {
        var airlines: string[] = [];
        var cabinClasses: string[] = [];

        flight.itineraries[0].segments.forEach(element => {
            if (!element.operating.carrierName) element.operating.carrierName = rest.dictionaries.carriers[element.operating.carrierCode]
            if (!airlines.includes(element.operating.carrierName)) airlines.push(element.operating.carrierName)
        });

        flight.travelerPricings.forEach(tp => {
            tp.fareDetailsBySegment.forEach(element => {
                if (!cabinClasses.includes(element.cabin)) cabinClasses.push(element.cabin);
            });
        });

        let segmentCount = flight['itineraries'][0]['segments'].length;
        let firstSeg = flight['itineraries'][0]['segments'][0];
        let lastSeg = flight['itineraries'][0]['segments'][segmentCount - 1];
        flight.startAt = timeFromDateStr(firstSeg.departure.at);
        flight.endAt = timeFromDateStr(lastSeg.arrival.at);
        flight.airlines = airlines;
        flight.cabinClasses = cabinClasses;

        // flight.travelClass = '';

        return flight;
    })
}