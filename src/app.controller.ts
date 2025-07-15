import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('menu')
  getMenu() {
    return this.appService.getMenu();
  }

  @Post('order')
  createOrder(@Body() orderItems) {
    return this.appService.createOrder(orderItems);
  }
}
