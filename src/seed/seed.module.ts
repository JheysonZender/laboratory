import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ElementsModule } from 'src/elements/elements.module';
import { StudiesModule } from 'src/studies/studies.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ElementsModule, StudiesModule]
})
export class SeedModule {}
