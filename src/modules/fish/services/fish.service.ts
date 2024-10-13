import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  EditFishRequestDto,
  FishListQueryParamsDto,
  FishListResponseDto,
} from '../types/fish.dto';
import { FishCustomRepository } from '../repositories/fish.repository';
import { LoggerClient } from '../../shared/logger.client';
import { Fish } from '../entities/fish.entity';

@Injectable()
export class FishService {
  constructor(
    private readonly fishRepository: FishCustomRepository,
    private readonly log: LoggerClient,
  ) {}

  async getPaginatedFishList(
    queryParamsDto: FishListQueryParamsDto,
  ): Promise<FishListResponseDto> {
    const { createdAtCursor, limit, idCursor } = queryParamsDto;
    const sortType = queryParamsDto.orderBy || 'ASC';

    const totalCount = await this.fishRepository.getTotalActiveFish();

    const results = await this.fishRepository.getPaginatedFishList(
      sortType,
      limit,
      createdAtCursor,
      idCursor,
    );

    return {
      total: totalCount,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: results.map(({ description, imageUrl, ...rest }) => rest),
    };
  }

  async getFishDetails(fishId: string): Promise<Fish> {
    const fish = await this.fishRepository.findOneById(fishId);
    if (!fish) {
      throw new HttpException(
        `No fish data found for id ${fishId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return fish;
  }

  async editFishDetails(
    fishId: string,
    version: number,
    updateFishDetails: EditFishRequestDto,
  ) {
    const fish = await this.fishRepository.findOneById(fishId);

    if (!fish) {
      throw new HttpException(
        `No fish data found for id ${fishId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (fish.version !== version) {
      this.log.error('Version mismatch found for ', fishId);
      throw new HttpException(
        `Version mismatch for ${fishId}`,
        HttpStatus.CONFLICT,
      );
    }

    const fishData: Partial<Fish> = {
      id: fish.id,
      description: updateFishDetails.description,
      name: updateFishDetails.description,
      length: updateFishDetails.length,
      lifespan: updateFishDetails.lifespan,
      updatedAt: new Date().toISOString(),
      version: fish.version + 1,
    };

    // Can also use transactions with Pessimistic locking here to further protect this.
    await this.fishRepository.updateFish(fishData);

    return (await this.fishRepository.findOneById(fishId)) as Fish;
  }
}
