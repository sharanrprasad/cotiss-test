import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fish } from '../entities/fish.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class FishCustomRepository {
  constructor(
    @InjectRepository(Fish)
    private readonly fishRepository: Repository<Fish>,
  ) {}

  async getTotalActiveFish(): Promise<number> {
    return this.fishRepository
      .createQueryBuilder('fish')
      .where('fish.isActive = :isActive', { isActive: true })
      .getCount();
  }

  async getPaginatedFishList(
    sortType: 'ASC' | 'DESC',
    limit: number,
    createdAtCursor: string | undefined,
    idCursor: string | undefined,
  ): Promise<Fish[]> {
    const query = this.fishRepository
      .createQueryBuilder('fish')
      .where('fish.isActive = :isActive', { isActive: true })
      .orderBy('fish.createdAt', sortType)
      .addOrderBy('fish.id', sortType) // Add tie-breaking order by id
      .limit(limit);

    // Apply the composite cursor logic
    if (createdAtCursor && idCursor) {
      if (sortType === 'ASC') {
        query.andWhere(
          '(fish.createdAt > :createdAtCursor OR (fish.createdAt = :createdAtCursor AND fish.id > :idCursor))',
          { createdAtCursor, idCursor },
        );
      } else {
        query.andWhere(
          '(fish.createdAt < :createdAtCursor OR (fish.createdAt = :createdAtCursor AND fish.id < :idCursor))',
          { createdAtCursor, idCursor },
        );
      }
    }

    // await this.fishRepository.insert({
    //   name: 'Salmon',
    //   imageUrl: 'https://www.google.com/images/snapper.jpg',
    //   lifespan: 12,
    //   length: 800,
    //   description: 'Salmon is not a bad fish.',
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // });

    return query.getMany();
  }

  async findOneById(fishId: string) {
    return this.fishRepository.findOneBy({ id: fishId, isActive: true });
  }

  async updateFish(entity: DeepPartial<Fish>) {
    return this.fishRepository.save(entity);
  }
}
