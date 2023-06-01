import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

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

  describe('createOrder', () => {
    it('should create an order', async () => {
      const createOrderDto = {
        user_id: 1,
        total_price: 100,
      };

      const saveMock = jest.fn().mockResolvedValue(createOrderDto);
      jest.spyOn(repository, 'save').mockImplementation(saveMock);

      const result = await service.createOrder(createOrderDto);

      expect(result).toEqual(createOrderDto);
      expect(saveMock).toHaveBeenCalledWith(expect.any(OrderEntity));
    });
  });

  describe('getOrder', () => {
    it('should return the order with the given id', async () => {
      const orderId = 1;
      const order = new OrderEntity();
      order.id = orderId;

      jest.spyOn(repository, 'findOne').mockResolvedValue(order);

      const result = await service.getOrder(orderId);

      expect(result).toEqual(order);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
      });
    });
  });

  describe('getOrders', () => {
    it('should return an array of orders', async () => {
      const orders = [new OrderEntity()];

      jest.spyOn(repository, 'find').mockResolvedValue(orders);

      const result = await service.getOrders();

      expect(result).toEqual(orders);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('completeOrder', () => {
    it('should update the order to complete', async () => {
      const orderId = 1;
      const order = new OrderEntity();
      order.id = orderId;
      order.is_completed = false;

      jest.spyOn(service, 'getOrder').mockResolvedValue(order);

      const saveMock = jest.fn().mockResolvedValue(order);
      jest.spyOn(repository, 'save').mockImplementation(saveMock);

      const result = await service.completeOrder(orderId);

      expect(result).toEqual(order);
      expect(order.is_completed).toBe(true);
      expect(saveMock).toHaveBeenCalledWith(order);
    });

    it('should throw BadRequestException if the order is already completed', async () => {
      const orderId = 1;
      const order = new OrderEntity();
      order.id = orderId;
      order.is_completed = true;

      jest.spyOn(service, 'getOrder').mockResolvedValue(order);

      await expect(service.completeOrder(orderId)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
