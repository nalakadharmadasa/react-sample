import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductService {
  private url = 'https://dummyjson.com/products';

  async getAllProducts() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException({
        code: error['response']['statusCode'] ?? 500,
        title: error['response']['error'] ?? 'Server Error',
        message: error['response']['message'] ?? 'Failed to fetch products.',
      });
    }
  }

  async getProductById(id: number) {
    try {
      const response = await axios.get(`${this.url}/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      throw new InternalServerErrorException({
        code: error['response']['statusCode'] ?? 500,
        title: error['response']['error'] ?? 'Server Error',
        message:
          error['response']['message'] ?? 'Failed to fetch product details.',
      });
    }
  }

  async getProductsByCategory(category: string, skip: number) {
    try {
      const response = await axios.get(
        `${this.url}/category/${category.trim()}`,
        {
          params: { skip: skip, limit: 10 },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(
          `No products found in category ${category}.`,
        );
      }
      throw new InternalServerErrorException({
        code: error['response']['statusCode'] ?? 500,
        title: error['response']['error'] ?? 'Server Error',
        message:
          error['response']['message'] ??
          'Failed to fetch products by category.',
      });
    }
  }
}
