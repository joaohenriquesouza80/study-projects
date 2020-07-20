import AppError from '@shared/errors/AppError';

import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';

let fakeProductRepository: FakeProductRepository;
let createProductService: CreateProductService;

describe('CreateProductService', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();

    createProductService = new CreateProductService(fakeProductRepository);
  });

  it('should be able to create a new product', async () => {
    const product = await createProductService.execute({
      name: 'Product 1',
      price: 100,
      quantity: 10,
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a duplicated product', async () => {
    await createProductService.execute({
      name: 'Product 1',
      price: 200,
      quantity: 5,
    });

    await expect(
      createProductService.execute({
        name: 'Product 1',
        price: 300,
        quantity: 15,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
