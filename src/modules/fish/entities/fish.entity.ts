import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('Fish')
export class Fish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // TODO - Look in to storing this as a string.
  @Column({ type: 'varchar', length: 512 })
  createdAt: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  lifespan: number;

  @Column({ type: 'integer' })
  length: number;

  @Column({ type: 'text' })
  imageUrl: string;
}
