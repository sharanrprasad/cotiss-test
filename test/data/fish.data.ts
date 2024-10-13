import { Fish } from '../../src/modules/fish/entities/fish.entity';
import { v4 as uuidv4 } from 'uuid';

export const getMockFishData = (val: Partial<Fish>): Fish => {
  return {
    id: uuidv4(),
    name: 'GoldFish',
    description: 'description',
    length: 20,
    lifespan: 30,
    createdAt: new Date().toISOString(),
    isActive: true,
    imageUrl: 'https://www.google.com',
    ...val,
  };
};
