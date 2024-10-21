import { Fish } from '../entities/fish.entity';

export enum FishUpdatedType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}

export interface FishUpdatedMessageValue {
  data: Fish;
  updateType: FishUpdatedType;
}
