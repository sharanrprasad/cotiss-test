import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getTestApplicationModule } from './mocks/app.module.mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fish } from '../src/modules/fish/entities/fish.entity';
import { DataSource, Repository } from 'typeorm';
import { getMockFishData } from './data/fish.data';

describe('FishController list (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await getTestApplicationModule().compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  beforeEach(async () => {
    const connection = app.get(DataSource);
    // Drops all tables and it's rows.
    await connection.synchronize(true);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/list order by', () => {
    it('/list (GET) should return fishes in ascending order by default', async () => {
      const fishRepository = app.get<Repository<Fish>, Repository<Fish>>(
        getRepositoryToken(Fish),
      );

      const fishData1 = getMockFishData({
        name: 'Tuna',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      });

      const fishData2 = getMockFishData({ name: 'Snapper' });

      // Add data to the fish table.
      await fishRepository.save([fishData1, fishData2]);

      const response = await request(app.getHttpServer()).get(
        '/fish/list?limit=5',
      );
      expect(response.status).toBe(200);
      expect(response.body.data.map((d: Fish) => d.id)).toEqual([
        fishData1.id,
        fishData2.id,
      ]);
    });

    it('/list (GET) should return fishes in descending order when specified', async () => {
      const fishRepository = app.get<Repository<Fish>, Repository<Fish>>(
        getRepositoryToken(Fish),
      );

      const fishData1 = getMockFishData({
        name: 'Tuna',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      });

      const fishData2 = getMockFishData({ name: 'Snapper' });

      // Add data to the fish table.
      await fishRepository.save([fishData1, fishData2]);

      const response = await request(app.getHttpServer()).get(
        '/fish/list?limit=5&orderBy=DESC',
      );
      expect(response.status).toBe(200);
      expect(response.body.data.map((d: Fish) => d.id)).toEqual([
        fishData2.id,
        fishData1.id,
      ]);
    });
  });

  describe('/list input validation', () => {
    it('/list should fail if no limit value is specified', async () => {
      const response = await request(app.getHttpServer()).get('/fish/list');
      expect(response.status).toBe(400);
    });
  });
});
