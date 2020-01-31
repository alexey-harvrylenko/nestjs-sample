import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from '../database/entities/Manufacturer';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturersService {
  constructor(@InjectRepository(Manufacturer) private manufacturerRepository: Repository<Manufacturer>) {
  }

  async seed() {
    const datum: Partial<Manufacturer>[] = [
      {
        name: 'audi',
        phone: '123-123-1234',
        siret: 10,
      },
      {
        name: 'mazda',
        phone: '123-123-1235',
        siret: 11,
      },
    ];

    return this.manufacturerRepository.insert(datum);
  }
}
