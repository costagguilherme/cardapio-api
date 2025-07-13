import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  private menu = JSON.parse(
    readFileSync(join(__dirname, '..', 'cardapio.json'), 'utf8')
  );

  private orders: any[] = [];
  private nextOrderId = 1;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('menu')
  getMenu() {
    return this.menu;
  }

  @Post('order')
  createOrder(@Body() orderItems) {
    const items = orderItems
      .map((o) => {
        const product = this.menu.find((p) => p.id === o.id);
        if (!product) return null;

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          count: o.count,
          total: +(product.price * o.count),
        };
      })
      .filter((i) => i !== null);

    const total = items.reduce((acc, i) => acc + i.total, 0);

    const newOrder = {
      id: this.nextOrderId++,
      items,
      total,
      createdAt: new Date(),
    };

    this.orders.push(newOrder);
    return newOrder;
  }
}
