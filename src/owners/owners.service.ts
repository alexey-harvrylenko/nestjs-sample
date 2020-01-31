import { Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { Owner } from '../database/entities/Owner';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownerRepository: Repository<Owner>) {
  }

  async seed() {
    const datum: Partial<Owner>[] = [
      {
        name: 'alex',
        purchaseDate: moment().subtract(19, 'months').toDate(),
      },
      {
        name: 'alex2',
        purchaseDate: new Date(),
      },
      {
        name: 'alex3',
        purchaseDate: moment().subtract(11, 'months').toDate(),
      },
    ];

    return this.ownerRepository.insert(datum);
  }

  deleteExpired(months: number) {
    return this.ownerRepository.delete({ purchaseDate: MoreThan(moment().subtract(months, 'month').toDate()) });
  }
}
