import { Injectable } from '@nestjs/common';
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
      data: results.map(({ description, ...rest }) => rest),
    };
  }

  async editFishDetails(fishId: string, updateFishDetails: EditFishRequestDto) {
    const fish = await this.fishRepository.findOneById(fishId);
    if (!fish) {
      throw new Error(`no fish data found for id ${fishId}`);
    }

    const fishData = {
      id: fish.id,
      ...updateFishDetails,
    };
    await this.fishRepository.updateFish(fishData);
    return (await this.fishRepository.findOneById(fishId)) as Fish;
  }
}
