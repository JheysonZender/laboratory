import { Module } from '@nestjs/common';
import { ElementsService } from './elements.service';
import { ElementsController } from './elements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';

@Module({
  controllers: [ElementsController],
  providers: [ElementsService],
  imports: [TypeOrmModule.forFeature([Element])],
  exports: [ElementsService]
})
export class ElementsModule {}
