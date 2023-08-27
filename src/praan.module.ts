import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger, LoggerService } from '@nestjs/common';
import config from './config';
import { PraanController } from './praan.controller';
import { PraanService } from './praan.service';
import ALL_ENTITIES from './db';
import { PraanRepository } from './praan.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature(ALL_ENTITIES),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
  ],
  controllers: [PraanController],
  providers: [PraanService, PraanRepository, Logger],
})
export class PraanModule {}