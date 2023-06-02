import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'The id of customer who places the order',
  })
  @IsNotEmpty()
  user_id: number;
  // @TODO: user entity 생성 후 연동하기

  @ApiProperty({
    example: 39000,
    description: 'Total payment amount of the order',
  })
  @IsNotEmpty()
  total_price: number;
}
