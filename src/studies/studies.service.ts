import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Study } from './entities/study.entity';

@Injectable()
export class StudiesService {

  private readonly logger = new Logger('StudyService');

  constructor( 
    @InjectRepository(Study)
    private readonly studiesRepository: Repository<Study>,
  ){}

  async create(createElementDto: CreateStudyDto) {
    try {
      const element = this.studiesRepository.create(createElementDto);
      await this.studiesRepository.save(element);
      return element;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0} = paginationDto;
    return this.studiesRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const study = await this.studiesRepository.findOneBy({ id });
    if( !study) throw new NotFoundException(`Study with id ${id} not found.`);
    return study;
  }

  async update(id: number, updateElementDto: UpdateStudyDto) {
    const element = await this.studiesRepository.preload({
      id:id,
      ...updateElementDto
    });

    if( !element) throw new NotFoundException(`Element with id ${id} not found.`)

    try{
      return this.studiesRepository.save(element);
    } catch( error ) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const element = await this.findOne(id);
    await this.studiesRepository.remove(element); 
  }

  private handleDBExceptions (error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Ayuda!!');
  }

  async deleteAllStudies() {
    const query = this.studiesRepository.createQueryBuilder('study');
    try {
      return await query.delete().where({}).execute()
    } catch(error) {
      this.handleDBExceptions(error)
    }
  }
}
