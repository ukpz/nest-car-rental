import { Injectable } from "@nestjs/common";
// import { CarProvider } from "../interfaces/car-provider.interface";
import { TravelportService } from "../../travelport/travelport.service";
// import { LocalCarService } from "./local/local.service";

@Injectable()
export class ProviderFactory {
    constructor(
        private travelportService: TravelportService,
        // private localService: LocalCarService,
    ) { }

    getProvider(provider?: 'travelport' | 'local' | 'all') {
        // if (!provider || provider === 'all') return [this.travelportService, this.localService];
        // if (provider === 'travelport') return this.travelportService;
        // if (provider === 'local') return this.localService;
        return this.travelportService
        throw new Error('Unsupported provider');
    }
}
