import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.customersService.findAll(paginationDto);
  }
  // Cualquier query parameter es un string
  @Get(':maiId')
  getCustomer(@Param('maiId', ParseIntPipe) myId: number) {
    return this.customersService.findOnebyId(myId);
  }
  
  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Patch(':maiId')
  update(@Param('maiId', ParseIntPipe) myId: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(myId, updateCustomerDto);
  }

  @Delete(':maiId')
  deleteCustomer(@Param('maiId', ParseIntPipe) myId: number) {
    return this.customersService.remove(myId);
  }
}
