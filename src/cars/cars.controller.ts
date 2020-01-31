import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CreateCarDTO from './dto/CreateCarDTO';
import { CarsService } from './cars.service';
import UpdateCarDTO from './dto/UpdateCarDTO';

@Controller('cars')
export class CarsController {
  constructor(private carService: CarsService) {
  }

  @Get('/apply-discount')
  async applyDiscount() {

    return this.carService.applyDiscount();
  }

  @Post()
  async create(@Body() payload: CreateCarDTO) {
    return this.carService.create(payload);
  }

  @Get()
  async find() {
    return this.carService.find();
  }

  @Get('/:carId')
  async findById(@Param('carId') carId: string) {
    return this.carService.findById(carId);
  }

  @Put('/:carId')
  async update(@Param('carId') carId: string, @Body() payload: UpdateCarDTO) {
    return this.carService.update(carId, payload);
  }

  @Delete('/:carId')
  async delete(@Param('carId') carId: string) {
    return this.carService.delete(carId);
  }

}
