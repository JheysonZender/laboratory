import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post()
  create(@Body() createStudyDto: CreateStudyDto) {
    return this.studiesService.create(createStudyDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.studiesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudyDto: UpdateStudyDto) {
    return this.studiesService.update(+id, updateStudyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studiesService.remove(+id);
  }
}
