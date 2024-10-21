import { Injectable } from '@nestjs/common';
import { Kafka, KafkaConfig, logLevel } from 'kafkajs';
import { ConfigClient } from './config.client';

@Injectable()
export class KafkaClient {
  private readonly kafkaClient: Kafka;
  constructor(private configClient: ConfigClient) {
    const kafkaConfig: KafkaConfig = {
      brokers: ['localhost:9092'],
      clientId: 'nestjs-fish-client',
      logLevel: logLevel.ERROR,
      retry: {
        initialRetryTime: 300,
        factor: 0.2, //default value. Some random number between 0 and 1 required to calculate.
        retries: 5, //default. Number of times to retry before failing.
        multiplier: 2, // exponentially differs the retry time.
      },
    };
    this.kafkaClient = new Kafka(kafkaConfig);
  }

  getKafkaClient() {
    return this.kafkaClient;
  }
}
