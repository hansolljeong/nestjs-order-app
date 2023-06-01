import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('/:id')
  getOrderById(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.getOrderById(id);
  }

  @Get()
  getOrders(): Promise<OrderEntity[]> {
    return this.ordersService.getOrders();
  }
}
