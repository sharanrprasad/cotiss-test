import { Injectable } from '@nestjs/common';
import { LoggerClient } from './logger.client';

export enum ConfigKeys {
  DatabaseUrl = 'DatabaseUrl',
  DbHost = 'DbHost',
  DbPort = 'DbPort',
  DbUserName = 'DbUserName',
  DbPassword = 'DbPassword',
  DbName = 'DbName',
  AwsRegion = 'AwsRegion',
  KafkaBrokers = 'KafkaBrokers',
}

@Injectable()
export class ConfigClient {
  private configValues: Map<ConfigKeys, string | number>;
  constructor(private log: LoggerClient) {
    this.configValues = new Map<ConfigKeys, string | number>();
  }
  async init(): Promise<void> {
    this.log.info('Initiating config service');
    // This is where I would read from AWS Secret manager and get all the secrets.
    return new Promise((resolve) => {
      this.configValues.set(ConfigKeys.AwsRegion, 'us-west-2');
      this.configValues.set(ConfigKeys.DatabaseUrl, 'http://localhost:5432');
      this.configValues.set(ConfigKeys.DbHost, 'localhost');
      this.configValues.set(ConfigKeys.DbPort, 5432);
      this.configValues.set(ConfigKeys.DbPassword, 'S3cret');
      this.configValues.set(ConfigKeys.DbUserName, 'citizix_user');
      this.configValues.set(ConfigKeys.DbName, 'citizix_db');
      this.configValues.set(ConfigKeys.KafkaBrokers, 'localhost:9092');
      resolve();
    });
  }

  get(key: ConfigKeys): string {
    const val = this.configValues.get(key);
    if (val === undefined || typeof val !== 'string') {
      throw new Error(`no config found for ${key}`);
    }
    return val;
  }

  getNumber(key: ConfigKeys): number {
    const val = this.configValues.get(key);
    if (val === undefined || typeof val !== 'number') {
      throw new Error(`no config found for ${key}`);
    }
    return val as number;
  }
}
