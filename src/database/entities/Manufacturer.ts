import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'int', nullable: true })
  siret: number;

  @OneToMany(type => Car, car => car.manufacturer)
  cars: Car[];
}
