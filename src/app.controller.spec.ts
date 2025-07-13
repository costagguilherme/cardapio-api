import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getMenu', () => {
    it('should return the full menu with valid structure', () => {
      const menu = appController.getMenu();

      expect(Array.isArray(menu)).toBe(true);
      expect(menu.length).toBeGreaterThan(0);

      menu.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('price');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('image');
      });
    });
  });

  describe('createOrder', () => {
    it('should create a new order with the given items', () => {
      const payload = [
        { id: 1, count: 2 },
        { id: 3, count: 1 },
        { id: 1000000, count: 2 }
      ];

      const order = appController.createOrder(payload);

      expect(order).toHaveProperty('id');
      expect(order).toHaveProperty('items');
      expect(order).toHaveProperty('total');
      expect(order).toHaveProperty('createdAt');

      expect(Array.isArray(order.items)).toBe(true);
      expect(order.items.length).toBe(2);

      order.items.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('price');
        expect(item).toHaveProperty('count');
        expect(item).toHaveProperty('total');
      });

      expect(order.total).toBeCloseTo(110.0);
    });
  });
});
