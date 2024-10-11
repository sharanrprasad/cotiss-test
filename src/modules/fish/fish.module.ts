import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fish } from './entities/fish.entity';
import { FishService } from './services/fish.service';
import { FishController } from './controllers/fish.controller';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { FishCustomRepository } from './repositories/fish.repository';

@Module({
  //TODO - Check the error here.
  imports: [TypeOrmModule.forFeature([Fish as EntityClassOrSchema])],
  providers: [FishService, FishCustomRepository],
  exports: [TypeOrmModule],
  controllers: [FishController],
})
export class FishModule {}
