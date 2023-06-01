import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  user_id: number;
  // @TODO: user entity 생성 후 연동하기

  @IsNotEmpty()
  total_price: number;
}
