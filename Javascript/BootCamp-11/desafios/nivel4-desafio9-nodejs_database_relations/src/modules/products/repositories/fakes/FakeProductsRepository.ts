import { uuid } from 'uuidv4';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';

interface IFindProducts {
  id: string;
}

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    const newData = data;
    newData.name = newData.name.toUpperCase();
    Object.assign(product, { id: uuid() }, data);

    this.products.push(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.name === name);

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
}

export default FakeProductsRepository;
