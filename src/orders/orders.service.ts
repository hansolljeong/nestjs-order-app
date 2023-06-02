import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const { user_id, total_price } = createOrderDto;

    const order = new OrderEntity();
    order.user_id = user_id;
    order.total_price = total_price;

    if (!(user_id && total_price) || Object.keys(order).length !== 2) {
      throw new BadRequestException(
        'Missing or additional unexpected argument',
      );
    }

    await this.ordersRepository.save(order);
    return order;
  }

  async getOrder(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Can't find order with id ${id}`);
    }

    return order;
  }

  async getOrders(): Promise<OrderEntity[]> {
    return await this.ordersRepository.find();
  }

  async completeOrder(id: number): Promise<OrderEntity> {
    const order = await this.getOrder(id);

    if (!order.is_completed) {
      order.is_completed = true;
      await this.ordersRepository.save(order);
    } else {
      throw new BadRequestException(`Order ${id} is already completed`);
    }

    return order;
  }
}
