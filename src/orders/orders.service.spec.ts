import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<OrderEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(OrderEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });
});
