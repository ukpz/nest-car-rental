import { Injectable } from '@nestjs/common';
import { buildCarSearchRequest, buildCarImageRequest, buildCarTypeRequest } from './helpers/request-builder.helper';
import { mapCarSearchResponse, mapCarImageResponse, mapCarTypeResponse } from './helpers/response-builder.helper';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { model } from 'mongoose';

@Injectable()
export class TravelportService {
    private readonly endpoint = process.env.TRAVELPORT_VEHICLE_URL ?? '';

    private async sendSoapRequest(xml: string): Promise<string> {

        const credentials = Buffer.from(`${process.env.TRAVELPORT_CREDENTIALS}`).toString('base64');

        const headers = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Accept': 'text/xml',
            'Authorization': `Basic ${credentials}`,
            'Content-Length': xml.length,
            'SOAPAction': ''
        };

        try {
            const { data } = await axios.post(this.endpoint, xml, { headers });
            return data;
        } catch (error) {
            console.error('Travelport SOAP Error:', error.response?.data || error.message);
            throw new Error('Travelport request failed');
        }
    }

    private async parseSoapResponse(xml: string): Promise<any> {
        try {
            // Remove namespace prefixes from tags
            const cleanedXml = xml.replace(/(<\/?)(\w+):([^>]*>)/g, '$1$2$3');
            // Parse with merged attributes
            const result = await parseStringPromise(cleanedXml, { explicitArray: false, mergeAttrs: true });
            return result;
        } catch (error) {
            console.error('Failed to parse XML:', error);
            throw new Error('Invalid SOAP response');
        }
    }

    async searchCars(params: any): Promise<any> {
        const soapBody = buildCarSearchRequest(params);
        const xmlResponse = await this.sendSoapRequest(soapBody);
        const parsed = await this.parseSoapResponse(xmlResponse);
        // console.log('Parsed XML Response:', JSON.stringify(parsed));  
        // return parsed;
        return mapCarSearchResponse(parsed);
    }

    async carImages(params: any): Promise<any> {
        console.log('Car Image Params:', params);

        const soapBody = buildCarImageRequest(params?.vehicleLocations);
        const xmlResponse = await this.sendSoapRequest(soapBody);
        const parsed = await this.parseSoapResponse(xmlResponse);
        // console.log('Parsed XML Response:', JSON.stringify(parsed));  
        // return parsed;
        return mapCarImageResponse(parsed);
    }

    async carTypes(params: any): Promise<any> {
        const filteredParams = params?.vehicleDateLocations?.vehicleVendorLocation.filter((item: any) => item.Type == 'Pickup');
        const promises = filteredParams.map(async (item: any) => {

            const soapBody = buildCarTypeRequest({ ...item, PickupDateTime: params?.vehicleDateLocations?.PickupDateTime });

            const xmlResponse = await this.sendSoapRequest(soapBody);
            const parsed = await this.parseSoapResponse(xmlResponse);

            return mapCarTypeResponse(item, parsed);
        });

        const results = await Promise.all(promises);
        return results.flat();
    }
}