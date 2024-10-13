import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Fish')
export class Fish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // TODO - Look in to storing this as a string.
  @Column({ type: 'varchar', length: 512 })
  createdAt: string;

  @Column({ type: 'varchar', length: 512 })
  updatedAt: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  lifespan: number;

  @Column({ type: 'integer', nullable: true })
  length?: number;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'integer', default: 1 })
  version: number;
}
