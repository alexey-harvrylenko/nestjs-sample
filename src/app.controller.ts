import { Controller, Get } from '@nestjs/common';
import { CarsService } from './cars/cars.service';
import { OwnersService } from './owners/owners.service';
import { ManufacturersService } from './manufacturers/manufacturers.service';
import _ = require('lodash');
import * as moment from 'moment';

@Controller()
export class AppController {
  constructor(
    private readonly carsService: CarsService,
    private readonly ownersService: OwnersService,
    private readonly manufacturersService: ManufacturersService,
  ) {
  }

  @Get('/seed-data')
  async seedDate() {
    const { identifiers: manufacturers } = await this.manufacturersService.seed();
    const { identifiers: owners } = await this.ownersService.seed();

    await Promise.all(_.map(owners, (owner, i) => {
      return this.carsService.create({
        manufacturerId: manufacturers[i % 2].id,
        price: 100,
        firstRegistrationDate: i % 2 ? moment().subtract(15, 'months').toDate() : new Date(),
        ownerId: owner.id,
      });
    }));

  }
}
