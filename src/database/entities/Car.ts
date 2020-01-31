import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from './Owner';
import { Manufacturer } from './Manufacturer';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  price: number;

  @CreateDateColumn({ name: 'first_registration_date' })
  firstRegistrationDate: Date;

  @Column({ name: 'manufacturer_id', type: 'uuid' })
  manufacturerId: string;

  @ManyToOne(type => Manufacturer, man => man.cars, { eager: true })
  @JoinColumn({
      name: 'manufacturer_id',
      referencedColumnName: 'id',
    },
  )
  manufacturer: Manufacturer;

  @ManyToMany(type => Owner, owner => owner.cars, { eager: true })
  owners: Owner[];
}
