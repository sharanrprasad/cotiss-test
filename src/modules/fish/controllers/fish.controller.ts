import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { LoggerClient } from '../../shared/logger.client';
import {
  EditFishRequestDto,
  EditFishRequestParams,
  FishDetailsRequestParams,
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

  @Get('/:fishId')
  async getFishDetails(
    @Param() params: FishDetailsRequestParams,
  ): Promise<Fish> {
    return this.fishService.getFishDetails(params.fishId);
  }

  @Put('/:fishId/:version')
  async editFishDetails(
    @Param() params: EditFishRequestParams,
    @Body() editFishDto: EditFishRequestDto,
  ): Promise<Fish> {
    return this.fishService.editFishDetails(
      params.fishId,
      params.version,
      editFishDto,
    );
  }
}
