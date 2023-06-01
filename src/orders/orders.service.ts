import { Injectable, NotFoundException } from '@nestjs/common';
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

    await this.ordersRepository.save(order);
    return order;
  }

  async getOrderById(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Can't find order with id ${id}`);
    }

    return order;
  }

  async getOrders(): Promise<OrderEntity[]> {
    return await this.ordersRepository.find();
  }
}
