import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigClient, ConfigKeys } from './modules/shared/config.client';
import { FishModule } from './modules/fish/fish.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigClient],
      useFactory: async (configClient: ConfigClient) => {
        return {
          type: 'postgres',
          host: configClient.get(ConfigKeys.DbHost),
          port: configClient.getNumber(ConfigKeys.DbPort),
          username: configClient.get(ConfigKeys.DbUserName),
          password: configClient.get(ConfigKeys.DbPassword),
          database: configClient.get(ConfigKeys.DbName),
          // Don't do this in production systems. We need to use migrations.
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    FishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
