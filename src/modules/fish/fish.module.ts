import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fish } from './entities/fish.entity';
import { FishService } from './services/fish.service';
import { FishController } from './controllers/fish.controller';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { FishCustomRepository } from './repositories/fish.repository';
import { FishKafkaProducer } from './messaging/fish.kafka.producer';
import { KafkaClient } from '../shared/kafka.client';
import { LoggerClient } from '../shared/logger.client';
import { FishKafkaConsumer } from './messaging/fish.kafka.consumer';

const fishKafkaProducerFactory = {
  provide: FishKafkaProducer,
  useFactory: async (kafkaClient: KafkaClient, logger: LoggerClient) => {
    const kafkaProducer = new FishKafkaProducer(kafkaClient, logger);
    await kafkaProducer.init();
    return kafkaProducer;
  },
  inject: [KafkaClient, LoggerClient],
};

const fishKafkaConsumerFactory = {
  provide: FishKafkaConsumer,
  useFactory: async (kafkaClient: KafkaClient, logger: LoggerClient) => {
    const kafkaConsumer = new FishKafkaConsumer(kafkaClient, logger);
    await kafkaConsumer.init();
    return kafkaConsumer;
  },
  inject: [KafkaClient, LoggerClient],
};

@Module({
  //TODO - Check the error here.
  imports: [TypeOrmModule.forFeature([Fish as EntityClassOrSchema])],
  providers: [
    FishService,
    FishCustomRepository,
    fishKafkaProducerFactory,
    fishKafkaConsumerFactory,
  ],
  exports: [TypeOrmModule],
  controllers: [FishController],
})
export class FishModule {}
