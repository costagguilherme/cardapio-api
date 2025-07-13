import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  private menu = JSON.parse(
    readFileSync(join(__dirname, '..', 'cardapio.json'), 'utf8'),
  );
  private orders: any[] = [];
  private nextOrderId = 1;

  getHello(): string {
    return 'Hello World!';
  }

  getMenu(): [] {
    return this.menu;
  }

  createOrder(orderItems) {
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
