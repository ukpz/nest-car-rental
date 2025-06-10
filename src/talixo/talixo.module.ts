import { Module } from '@nestjs/common';
import { TalixoService } from './talixo.service';

@Module({
  providers: [TalixoService],
  exports:[TalixoService]
})
export class TalixoModule {}
