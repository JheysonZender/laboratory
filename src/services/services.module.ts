import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Element } from 'src/elements/entities/element.entity';
import { Study } from 'src/studies/entities/study.entity';
import { ElementsModule } from 'src/elements/elements.module';
import { StudiesModule } from 'src/studies/studies.module';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [TypeOrmModule.forFeature([Service, Element, Study]), ElementsModule, StudiesModule],
})
export class ServicesModule {}
