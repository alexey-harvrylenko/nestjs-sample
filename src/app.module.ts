/*external*/
import { Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*controllers*/
import { AppController } from './app.controller';
/*services*/
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { OwnersModule } from './owners/owners.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
/*other*/
import * as ormConfigProd from '../ormconfig-prod.js';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfigProd),
    CarsModule,
    OwnersModule,
    ManufacturersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
