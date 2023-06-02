import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The id of customer who places the order',
  })
  @Column()
  user_id: number;

  @ApiProperty({
    description: 'whether the order is complete',
  })
  @Column({ default: false })
  is_completed: boolean;

  @ApiProperty({
    description: 'Total payment amount of the order',
  })
  @Column()
  total_price: number;

  @ApiProperty({
    description: 'When order was created',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'When order was updated',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
