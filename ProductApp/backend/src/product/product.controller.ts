import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(+id);
  }

  @Get('category/:category')
  getProductsByCategory(
    @Param('category') category: string,
    @Query('skip') skip: number,
  ) {
    return this.productService.getProductsByCategory(category, skip);
  }
}
