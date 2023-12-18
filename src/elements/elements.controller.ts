import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ElementsService } from './elements.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('elements')
export class ElementsController {
  constructor(private readonly elementsService: ElementsService) {}

  @Post()
  create(@Body() createElementDto: CreateElementDto) {
    return this.elementsService.create(createElementDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.elementsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementDto: UpdateElementDto) {
    return this.elementsService.update(+id, updateElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementsService.remove(+id);
  }
}
