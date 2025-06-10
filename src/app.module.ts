import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { WebModule } from './web/web.module';
import { ApiModule } from './api/api.module';
import { TravelportModule } from './travelport/travelport.module';
import { CmsModule } from './cms/cms.module';
import { TalixoModule } from './talixo/talixo.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI
      })
    }),
   
    WebModule,
    ApiModule,
    TravelportModule,
    CmsModule,
    TalixoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
