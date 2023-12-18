import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger('CustomerService');
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0} = paginationDto;
    return this.customerRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOnebyId(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    if( !customer) throw new NotFoundException(`Customer with id ${id} not found.`);
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer);
      return customer;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update( id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.preload({
      id:id,
      ...updateCustomerDto
    });

    if( !customer) throw new NotFoundException(`Customer with id ${id} not found.`)

    try{
      return this.customerRepository.save(customer);
    } catch( error ) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const customer = await this.findOnebyId(id);
    await this.customerRepository.remove(customer); 
  }

  private handleDBExceptions (error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Ayuda!!');
  }
}
