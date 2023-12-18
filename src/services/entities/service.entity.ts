import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Element } from '../../elements/entities/element.entity';
import { Study } from "src/studies/entities/study.entity";

@Entity()
export class Service {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @ManyToOne(()=> Element, (element)=> element.services)
  element: Element;

  @ManyToOne(()=> Study, (study) => study.services)
  study: Study;
  
  @Column('float')
  price: number;
  
  @Column('text', {
    default: "no description"
  }) 
  description: string;
}
