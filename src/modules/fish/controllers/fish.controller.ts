import { Body, Controller, Post } from '@nestjs/common';
import { LoggerClient } from '../../shared/logger.client';
import { FishListFilterRequestDto } from '../types/fish.dto';
import { FishService } from '../services/fish.service';

@Controller('fish')
export class FishController {
  constructor(
    private log: LoggerClient,
    fishService: FishService,
  ) {}

  @Post('/list')
  getPaginatedFishList(@Body() fishListRequest: FishListFilterRequestDto) {
    return;
  }
}
