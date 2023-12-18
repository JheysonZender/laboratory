import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {

  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column('text', { unique: true })
  dni: string;
  
  @Column('text')
  name: string;
  
  @Column('text') 
  lastName: string;
}
