import { Injectable, NotFoundException } from '@nestjs/common';
import CreateCarDTO from './dto/CreateCarDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../database/entities/Car';
import { Between, Repository } from 'typeorm';
import { Owner } from '../database/entities/Owner';
import UpdateCarDTO from './dto/UpdateCarDTO';
import _ = require('lodash');
import { OwnersService } from '../owners/owners.service';
import * as moment from 'moment';
import { Manufacturer } from '../database/entities/Manufacturer';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(Manufacturer) private manufacturerRepository: Repository<Manufacturer>,
    private ownerService: OwnersService,
  ) {

  }

  async create(payload: CreateCarDTO) {
    const car = this.carRepository.create();

    car.price = payload.price;
    car.firstRegistrationDate = payload.firstRegistrationDate;

    const manufacturer = await this.manufacturerRepository.findOne(payload.manufacturerId);
    if ( !manufacturer ) throw new NotFoundException('Manufacturer not found.');

    car.manufacturer = manufacturer;

    const owner = await this.ownerRepository.findOne(payload.ownerId);
    if ( !owner ) throw new NotFoundException('Owner not  found');

    car.owners = [owner];

    return this.carRepository.save(car, { reload: true });
  }

  async findById(carId: string) {
    return this.carRepository.findOne(carId);
  }

  async find() {
    return this.carRepository.find();
  }

  async update(carId: string, payload: UpdateCarDTO) {
    const existingCar = await this.findById(carId);
    if ( !existingCar ) throw new NotFoundException('Car not found.');

    existingCar.price = payload.price;
    existingCar.firstRegistrationDate = payload.firstRegistrationDate;
    existingCar.manufacturerId = payload.manufacturerId;

    if ( !_.some(existingCar.owners, own => own.id === payload.ownerId) ) {
      const owner = await this.ownerRepository.findOne(payload.ownerId);
      if ( !owner ) throw new NotFoundException('Owner not found');
      existingCar.owners.push(owner);
    }

    return this.carRepository.save(existingCar, { reload: true });
  }

  async delete(carId: string) {
    return this.carRepository.delete(carId);
  }

  async applyDiscount() {
    await this.ownerService.deleteExpired(18);
    await this.carRepository.update({
      firstRegistrationDate: Between(
        moment().subtract(18, 'months').toDate(),
        moment().subtract(12, 'months').toDate(),
      ),
    }, {
      price: () => '"price" * 0.8',
    });
  }
}
