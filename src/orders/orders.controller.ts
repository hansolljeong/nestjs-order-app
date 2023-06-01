import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
  getOrder(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.getOrder(id);
  }

  @Get()
  getOrders(): Promise<OrderEntity[]> {
    return this.ordersService.getOrders();
  }

  @Patch('/:id')
  completeOrder(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.completeOrder(id);
  }
}
