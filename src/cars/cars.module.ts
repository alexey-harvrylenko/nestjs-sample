import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { OwnersModule } from '../owners/owners.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../database/entities/Car';
import { Owner } from '../database/entities/Owner';
import { Manufacturer } from '../database/entities/Manufacturer';

@Module({
  imports: [
    OwnersModule,
    TypeOrmModule.forFeature([Car, Owner, Manufacturer]),
  ],
  exports: [
    CarsService,
  ],
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {
}
