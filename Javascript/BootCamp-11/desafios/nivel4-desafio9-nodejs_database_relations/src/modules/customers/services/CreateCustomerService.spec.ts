import AppError from '@shared/errors/AppError';

import FakeCustomerRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();

    createCustomerService = new CreateCustomerService(fakeCustomerRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create a customer with one e-mail thats already registered', async () => {
    await createCustomerService.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
    });

    await expect(
      createCustomerService.execute({
        name: 'any_name',
        email: 'johndoe@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
