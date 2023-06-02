import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created order object as response',
    type: OrderEntity,
  })
  @ApiBadRequestResponse({ description: 'Cannot create order' })
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Called order object',
    type: OrderEntity,
  })
  @ApiNotFoundResponse({ description: 'Cannot find order' })
  getOrder(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.getOrder(id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Called order objects',
    type: [OrderEntity],
  })
  getOrders(): Promise<OrderEntity[]> {
    return this.ordersService.getOrders();
  }

  @Patch('/:id')
  @ApiOkResponse({
    description: 'Updated order status to completed',
    type: OrderEntity,
  })
  @ApiNotFoundResponse({ description: 'Cannot find order' })
  @ApiBadRequestResponse({ description: 'Cannot update order' })
  completeOrder(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.completeOrder(id);
  }
}
