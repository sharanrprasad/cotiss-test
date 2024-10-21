import { KafkaClient } from '../../shared/kafka.client';
import { CompressionTypes, Producer } from 'kafkajs';
import { FishUpdatedMessageValue } from '../types/fish.kafka.messages';
import { LoggerClient } from '../../shared/logger.client';

export class FishKafkaProducer {
  static FishKafkaTopic = 'FISH_UPDATES';
  kafkaProducer: Producer;

  constructor(
    private readonly kafkaClient: KafkaClient,
    private readonly logger: LoggerClient,
  ) {
    this.kafkaProducer = kafkaClient.getKafkaClient().producer({
      allowAutoTopicCreation: false,
    });
  }

  async init() {
    const admin = this.kafkaClient.getKafkaClient().admin();
    await admin.connect();
    // Will create topic if not already present.
    await admin.createTopics({
      topics: [{ topic: FishKafkaProducer.FishKafkaTopic }],
    });
    await admin.disconnect();
    await this.kafkaProducer.connect();
  }

  // Not the right way. We need to make sure that the topic exists before creating consumer.
  async produceFishUpdated(
    messageValue: FishUpdatedMessageValue,
  ): Promise<void> {
    try {
      await this.kafkaProducer.send({
        topic: FishKafkaProducer.FishKafkaTopic,
        compression: CompressionTypes.GZIP,
        acks: -1, // All the broker replicas must acknowledge as well.
        messages: [
          { key: messageValue.data.id, value: JSON.stringify(messageValue) },
        ],
      });
    } catch (err) {
      // Dead letter queues are only for consumers failing.
      this.logger.error('Error sending kafka message', {
        value: messageValue,
        err,
      });
    }
  }
}
