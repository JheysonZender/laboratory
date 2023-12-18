import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { ServicesModule } from './services/services.module';
import { ElementsModule } from './elements/elements.module';
import { StudiesModule } from './studies/studies.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomersModule,
    CommonModule,
    ServicesModule,
    ElementsModule,
    StudiesModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
