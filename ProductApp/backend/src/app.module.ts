import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './helper/exception.filter';

@Module({
  imports: [ProductModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
