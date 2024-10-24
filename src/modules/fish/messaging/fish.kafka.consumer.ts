import { Injectable } from '@nestjs/common';
import { Consumer } from 'kafkajs';
import { KafkaClient } from '../../shared/kafka.client';
import { LoggerClient } from '../../shared/logger.client';
import { FishKafkaProducer } from './fish.kafka.producer';

@Injectable()
export class FishKafkaConsumer {
  // All the instances of this server should have same group id.
  // Kafka ensures that each instance with same group id is assigned one or multiple partitions and messages are consumed in order in that partition.
  static consumerGroupId: string = 'consumer-fish-updates-self';
  kafkaConsumer: Consumer;

  constructor(
    private readonly kafkaClient: KafkaClient,
    private readonly logger: LoggerClient,
  ) {
    this.kafkaConsumer = kafkaClient.getKafkaClient().consumer({
      groupId: FishKafkaConsumer.consumerGroupId,
    });
  }

  async init() {
    await this.kafkaConsumer.connect();
    await this.kafkaConsumer.subscribe({
      topics: [FishKafkaProducer.FishKafkaTopic],
    });
    this.kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        this.logger.info('Got message', {
          key: message.key?.toString(),
          value: message.value?.toString(),
          headers: message.headers,
          partition,
          topic,
        });
      },
    });
  }
}
