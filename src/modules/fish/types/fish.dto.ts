import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Fish } from '../entities/fish.entity';
import { Type } from 'class-transformer';

export class FishListQueryParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  limit: number;

  @IsOptional()
  @IsString()
  createdAtCursor?: string;

  @IsOptional()
  @IsString()
  idCursor?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  orderBy?: 'ASC' | 'DESC';
}

export type FishListData = Omit<Fish, 'description'>;

export interface FishListResponseDto {
  total: number;
  data: FishListData[];
}

/* Edit Fish API types. */
export class EditFishRequestParams {
  @IsString()
  @IsUUID()
  fishId: string;

  @Type(() => Number)
  @IsNumber()
  version: number;
}

export class EditFishRequestDto {
  @IsString()
  @IsOptional()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  length: number;

  @IsString()
  @IsOptional()
  name: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  lifespan: number;
}
