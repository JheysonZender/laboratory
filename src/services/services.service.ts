import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Query } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Study } from 'src/studies/entities/study.entity';
import { Element } from 'src/elements/entities/element.entity';
import { ElementsModule } from '../elements/elements.module';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ElementsService } from 'src/elements/elements.service';
import { StudiesService } from 'src/studies/studies.service';

@Injectable()
export class ServicesService {

  private readonly logger = new Logger('ServicesService');
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,

    private readonly elementsService: ElementsService,
    private readonly studiesService: StudiesService,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const {element, study, ...props} = createServiceDto;
    try {
      
      const myElement = await this.elementsService.findOne(element);
      const myStudy = await this.studiesService.findOne(study);
      
      const service = this.servicesRepository.create({
        element:myElement,
        study:myStudy,
        ...props
      });

      await this.servicesRepository.save(service);
      return service;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0} = paginationDto;
    return this.servicesRepository.find({
      take: limit,
      skip: offset,
      relations: ['element', 'study'],
    });
  }

  async findOne(id: number) {
    const service = await this.servicesRepository.findOneBy({id});
    if( !service) throw new NotFoundException(`Service with id ${id} not found.`);
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const {element, study, ...props} = updateServiceDto;
    
    const service = await this.servicesRepository.findOneBy({ id });
    if( !service) throw new NotFoundException(`Service with id ${id} not found.`)
    console.log("d",service)
    if(element){
      const myElement = await this.elementsService.findOne(element);
      if( !myElement) throw new NotFoundException(`Elemento with id ${id} not found.`)
      service.element = myElement;
    }
    
    if(study){
      const myStudy = await this.studiesService.findOne(study);
      if( !myStudy) throw new NotFoundException(`Estudio with id ${id} not found.`)
      service.study = myStudy;
    }

    console.log(service)
    try{
      return this.servicesRepository.save(service);
    } catch( error ) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const service = await this.findOne(id);
    await this.servicesRepository.remove(service); 
  }

  private handleDBExceptions (error: any) {
    //console.log(error)
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(error.response.message);
  }

  async deleteAllServices() {
    
  }
}
