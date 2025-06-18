import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { buildOfferSearchReq } from './helpers/request-builder.helper';

@Injectable()
export class AmadeusService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    private readonly authUrl = process.env.AMADEUS_AUTH_URL ?? '';
    private readonly endpoint = process.env.AMADEUS_API_URL ?? '';
    private readonly clientId = process.env.AMADEUS_CLIENT_ID ?? '';
    private readonly clientSecret = process.env.AMADEUS_CLIENT_SECRET ?? '';

    private async authenticate() {
        const cacheKey = 'AMDAUTH001';
        const cached = await this.cacheManager.get<any>(cacheKey);
        if (cached) {
            console.log('token retrieved from cache');
            return cached.access_token;
        }
        const reqData = {
            grant_type: 'client_credentials',
            client_id: this.clientId,
            client_secret: this.clientSecret
        };

        // Convert data to x-www-form-urlencoded format
        const formData = new URLSearchParams();
        for (const key in reqData) {
            formData.append(key, reqData[key]);
        }
        const { data } = await axios.post(this.authUrl, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        await this.cacheManager.set(cacheKey, data, data.expires_in * 1000);
        return data.access_token;
    }

    async search(dto) {
        try {
            const token = await this.authenticate();
            const reqData = buildOfferSearchReq(dto);
            // console.log(JSON.stringify(reqData));
            
            // return reqData;
            const { data } = await axios.post(`${this.endpoint}/v2/shopping/flight-offers`, reqData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return data;
        } catch (error) {
            // console.log('flight search error: ',error.message);
            // return null;
            throw new Error(`flight search error: ${error.message}`);
        }
    }
}
