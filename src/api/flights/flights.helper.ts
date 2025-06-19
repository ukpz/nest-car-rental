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

function getStopText(itinerary: any): string {
  const segments = itinerary.segments;
  const stopCount = segments.length - 1;

  // Case 1: Non-stop (only one segment)
  if (stopCount === 0) {
    return 'Non-stop';
  }

  // Case 2: Check if all segments have same carrier and flight number (direct flight)
  const sameFlight = segments.every(
    (seg) =>
      seg.carrierCode === segments[0].carrierCode &&
      seg.number === segments[0].number
  );

  if (sameFlight) {
    return 'Direct';
  }

  // Case 3: Multi-stop
  const stopAirports = segments.slice(0, -1).map((seg: any) => seg.arrival.iataCode);
  return `${stopCount} stop${stopCount > 1 ? 's' : ''} via ${stopAirports.join(', ')}`;
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
        flight.stops=getStopText(flight['itineraries'][0])

        // flight.travelClass = '';

        return flight;
    })
}