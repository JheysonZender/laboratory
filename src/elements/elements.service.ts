import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from './entities/element.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ElementsService {

  private readonly logger = new Logger('ElementsService');

  constructor( 
    @InjectRepository(Element)
    private readonly elementsRepository: Repository<Element>,
  ){}

  async create(createElementDto: CreateElementDto) {
    try {
      const element = this.elementsRepository.create(createElementDto);
      await this.elementsRepository.save(element);
      return element;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0} = paginationDto;
    return this.elementsRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const element = await this.elementsRepository.findOneBy({ id });
    if( !element) throw new NotFoundException(`Element with id ${id} not found.`);
    return element;
  }

  async update(id: number, updateElementDto: UpdateElementDto) {
    const element = await this.elementsRepository.preload({
      id:id,
      ...updateElementDto
    });

    if( !element) throw new NotFoundException(`Element with id ${id} not found.`)

    try{
      return this.elementsRepository.save(element);
    } catch( error ) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const element = await this.findOne(id);
    await this.elementsRepository.remove(element); 
  }

  private handleDBExceptions (error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Ayuda!!');
  }

  async deleteAllElements() {
    const query = this.elementsRepository.createQueryBuilder('element');
    try {
      return await query.delete().where({}).execute()
    } catch(error) {
      this.handleDBExceptions(error)
    }
  }
}
