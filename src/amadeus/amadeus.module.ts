import { Module } from '@nestjs/common';
import { AmadeusService } from './amadeus.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register()
  ],
  providers: [AmadeusService],
  exports: [AmadeusService]
})
export class AmadeusModule { }
