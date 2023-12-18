import { Service } from "src/services/entities/service.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Study {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(()=> Service, services => services.study, {cascade: true, onDelete: 'CASCADE'} ) 
  services: Service[]
}
