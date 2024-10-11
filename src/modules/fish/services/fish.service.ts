import { Injectable } from '@nestjs/common';
import { FishListQueryParamsDto, FishListResponseDto } from '../types/fish.dto';
import { FishCustomRepository } from '../repositories/fish.repository';

@Injectable()
export class FishService {
  constructor(private readonly fishRepository: FishCustomRepository) {}

  async getPaginatedFishList(
    queryParamsDto: FishListQueryParamsDto,
  ): Promise<FishListResponseDto> {
    const { createdAtCursor, limit, idCursor } = queryParamsDto;
    const sortType = queryParamsDto.orderBy || 'ASC';

    console.log(createdAtCursor, idCursor);

    const totalCount = await this.fishRepository.getTotalActiveFish();

    const results = await this.fishRepository.getPaginatedFishList(
      sortType,
      limit,
      createdAtCursor,
      idCursor,
    );

    const returnVal: FishListResponseDto = {
      total: totalCount,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: results.map(({ description, ...rest }) => rest),
    };

    return returnVal;
  }
}
