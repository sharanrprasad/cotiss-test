import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { SharedModule } from '../../src/modules/shared/shared.module';
import { FishModule } from '../../src/modules/fish/fish.module';
import { ConfigClient } from '../../src/modules/shared/config.client';
import { MockConfigClient } from './mock.config.client';

export const getTestTypeOrmModule = () => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'test_user',
    password: 'test_password',
    database: 'test_db',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  });
};

export const getTestApplicationModule = () => {
  const module: TestingModuleBuilder = Test.createTestingModule({
    imports: [SharedModule, getTestTypeOrmModule(), FishModule],
    providers: [],
  })
    .overrideProvider(ConfigClient)
    .useClass(MockConfigClient);

  return module;
};
