import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TalixoService {
    private readonly endpoint = process.env.TALIXO_API_END_POINT ?? '';
    private readonly apiKey = process.env.TALIXO_API_KEY ?? '';

    async search(payload) {
        const result = await axios.post(`${this.endpoint}/en/mapi/v3/vehicles/booking_query/`, payload, {
            headers: {
                'Content-Type': 'application/json',
                "partner": this.apiKey
            }
        })
        return result.data;
    }
}
