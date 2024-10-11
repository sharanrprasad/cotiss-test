import { Controller, Query, Get } from '@nestjs/common';
import { LoggerClient } from '../../shared/logger.client';
import { FishListQueryParamsDto, FishListResponseDto } from '../types/fish.dto';
import { FishService } from '../services/fish.service';

@Controller('fish')
export class FishController {
  constructor(
    private log: LoggerClient,
    private fishService: FishService,
  ) {}

  @Get('/list')
  async getPaginatedFishList(
    @Query() fishListQuery: FishListQueryParamsDto,
  ): Promise<FishListResponseDto> {
    return this.fishService.getPaginatedFishList(fishListQuery);
  }
}
