import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'date', name: 'purchase_date', nullable: true })
  purchaseDate: Date;

  @ManyToMany(type => Car, car => car.owners)
  @JoinTable({
    joinColumn: {
      name: 'owner_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'car_id',
      referencedColumnName: 'id',
    },
  })
  cars: Car[];
}
