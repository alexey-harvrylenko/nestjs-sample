import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { Manufacturer } from '../database/entities/Manufacturer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manufacturer]),
  ],
  providers: [ManufacturersService],
  exports: [ManufacturersService],
})
export class ManufacturersModule {
}
