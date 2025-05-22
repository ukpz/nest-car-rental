// cars/providers/travelport/helpers/request-builder.helper.ts

export function buildCarSearchRequest(params: {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;   // format: YYYY-MM-DD
  dropoffDate: string;  // format: YYYY-MM-DD
  pickupTime?: string;  // optional, e.g. "10:00"
  dropoffTime?: string;
  driverAge?: string;
}) {
  const {
    pickupLocation,
    dropoffLocation,
    pickupDate,
    dropoffDate,
    pickupTime = '10:00',
    dropoffTime = '10:00',
    driverAge = '30',
  } = params;

  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <veh:VehicleSearchAvailabilityReq ReturnMediaLinks="true" ReturnAllRates="true" ReturnApproximateTotal="true" AuthorizedBy="TEST" TargetBranch="${process.env.TRAVELPORT_TARGETBRANCH}" xmlns:com="http://www.travelport.com/schema/common_v50_0" xmlns:veh="http://www.travelport.com/schema/vehicle_v50_0">
                <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
                <veh:VehicleDateLocation PickupLocation="${pickupLocation}" PickupDateTime="${pickupDate}T${pickupTime}:00" ReturnLocation="${dropoffLocation}" ReturnDateTime="${dropoffDate}T${dropoffTime}:00" >
                </veh:VehicleDateLocation>
            </veh:VehicleSearchAvailabilityReq>
        </soapenv:Body>
        </soapenv:Envelope>`
}

export function buildCarImageRequest(params: { Type?: string; LocationCode?: string; VendorCode?: string }[]) {

  params = params.filter(item => item?.Type == 'Pickup')

  const vendorElements = params.map(item => {
    const { LocationCode, VendorCode } = item;
    return `<veh:VehiclePickupLocation PickUpLocation="${LocationCode}">
                <veh:Vendor Code="${VendorCode}"/>
            </veh:VehiclePickupLocation>`
  }).join('');

  return `<soapenv:Envelope
          xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
          <soapenv:Header/>
          <soapenv:Body>
            <veh:VehicleMediaLinksReq AuthorizedBy="TEST" TargetBranch="${process.env.TRAVELPORT_TARGETBRANCH}"
              xmlns:veh="http://www.travelport.com/schema/vehicle_v50_0"
              xmlns:com="http://www.travelport.com/schema/common_v50_0">
              <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>

              ${vendorElements}

            </veh:VehicleMediaLinksReq>
          </soapenv:Body>
        </soapenv:Envelope>`
}


export function buildCarTypeRequest(params: any) {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
            <soapenv:Body>
                <veh:VehicleKeywordReq AuthorizedBy="TEST" TargetBranch="${process.env.TRAVELPORT_TARGETBRANCH}" KeywordList="false" xmlns:veh="http://www.travelport.com/schema/vehicle_v50_0" xmlns:com="http://www.travelport.com/schema/common_v50_0">
                    <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
                    <veh:Vendor Code="${params?.VendorCode}"/>
                    <veh:PickupDateLocation Date="${params.PickupDateTime}" Location="${params?.LocationCode}" LocationType="${params?.LocationType}" PickupLocationNumber="${params?.VendorLocationID}"/>
                    <com:Keyword Name="CARS" Number="02" Description="CAR/VEHICLE TYPES"></com:Keyword>
                </veh:VehicleKeywordReq>
            </soapenv:Body>
            </soapenv:Envelope>`
}