import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';

@Module({
  providers: [CmsService]
})
export class CmsModule { }
