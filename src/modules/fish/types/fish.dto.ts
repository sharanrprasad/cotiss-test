import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Fish } from '../entities/fish.entity';

export class FishListFilterRequestDto {
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
  data: FishListData;
}
