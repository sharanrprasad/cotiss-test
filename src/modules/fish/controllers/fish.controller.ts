import { Controller, Query, Get, Param, Put, Body } from '@nestjs/common';
import { LoggerClient } from '../../shared/logger.client';
import {
  EditFishRequestDto,
  EditFishRequestParams,
  FishListQueryParamsDto,
  FishListResponseDto,
} from '../types/fish.dto';
import { FishService } from '../services/fish.service';
import { Fish } from '../entities/fish.entity';

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

  @Put('/edit/:fishId')
  async editFishDetails(
    @Param() params: EditFishRequestParams,
    @Body() editFishDto: EditFishRequestDto,
  ): Promise<Fish> {
    const result = await this.fishService.editFishDetails(
      params.fishId,
      editFishDto,
    );
    return result;
  }
}
