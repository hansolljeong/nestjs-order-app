import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateOrderDto } from '../src/orders/dto/create-order.dto';
import { OrdersService } from '../src/orders/orders.service';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let service: OrdersService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<OrdersService>(OrdersService);
    await app.init();
  });

  describe('/orders', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/orders')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });

    it('POST 201', () => {
      const createOrderDto: CreateOrderDto = {
        user_id: 1,
        total_price: 100,
      };

      return request(app.getHttpServer())
        .post('/orders')
        .send(createOrderDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.user_id).toBe(createOrderDto.user_id);
          expect(res.body.total_price).toBe(createOrderDto.total_price);
        });
    });
  });

  describe('/orders/:id', () => {
    it('GET 200', () => {
      const orderId = 1;

      return request(app.getHttpServer())
        .get(`/orders/${orderId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(orderId);
        });
    });

    it('PATCH 200', async () => {
      const createOrderDto = {
        user_id: 1,
        total_price: 100,
      };
      const createdOrder = await service.createOrder(createOrderDto);

      const orderId = createdOrder.id;

      return request(app.getHttpServer())
        .patch(`/orders/${orderId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(orderId);
          expect(res.body.is_completed).toBe(true);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
