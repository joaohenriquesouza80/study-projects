import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const existentCustomer = await this.customersRepository.findById(
      customer_id,
    );

    if (!existentCustomer) {
      throw new AppError('Customer must exists');
    }

    const productsId = products.map(product => ({ id: product.id }));

    const existentProducts = await this.productsRepository.findAllById(
      productsId,
    );

    /* const existentProducts = await this.productsRepository.findAllById(
      products,
    ); */

    if (!existentProducts || existentProducts.length < products.length) {
      throw new AppError('All Products must exists');
    }

    const productsToUpdate: IUpdateProductsQuantityDTO[] = [];
    const productsToOrder = existentProducts.map(existentProduct => {
      if (existentProduct.quantity <= 0) {
        throw new AppError(
          `Product Id '${existentProduct.id}' has no quantity`,
          412,
        );
      }

      const orderProductIndex = products.findIndex(
        p => p.id === existentProduct.id,
      );

      if (products[orderProductIndex].quantity > existentProduct.quantity) {
        throw new AppError(
          `Product Id '${existentProduct.id}' has insufficient quantity`,
        );
      }

      productsToUpdate.push({
        id: existentProduct.id,
        quantity:
          existentProduct.quantity - products[orderProductIndex].quantity,
      });

      return {
        ...existentProduct,
        quantity: products[orderProductIndex].quantity,
      };
    });

    const order = await this.ordersRepository.create({
      customer: existentCustomer,
      products: productsToOrder.map(product => ({
        product_id: product.id,
        price: product.price,
        quantity: product.quantity,
      })),
    });

    await this.productsRepository.updateQuantity(productsToUpdate);

    return order;
  }
}

export default CreateProductService;
