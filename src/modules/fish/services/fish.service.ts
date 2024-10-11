import { Injectable } from '@nestjs/common';
import {
  FishListFilterRequestDto,
  FishListResponseDto,
} from '../types/fish.dto';
import { FishCustomRepository } from '../repositories/fish.repository';

@Injectable()
export class FishService {
  constructor(private readonly fishRepository: FishCustomRepository) {}

  async getPaginatedFishList(
    requestDto: FishListFilterRequestDto,
  ): Promise<FishListResponseDto> {
    const { createdAtCursor, limit, idCursor } = requestDto;
    const sortType = requestDto.orderBy || 'ASC';

    const totalCount = this.fishRepository.getTotalActiveFish();

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
}
