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
import { OmitType } from '@nestjs/swagger';

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
}

export class EditFishRequestDto extends OmitType(Fish, [
  'id',
  'imageUrl',
  'isActive',
  'createdAt',
] as const) {
  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  length: number;

  @IsString()
  name: string;

  @Type(() => Number)
  @IsInt()
  lifespan: number;
}
