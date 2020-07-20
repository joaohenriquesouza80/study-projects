import AppError from '../error/AppError';

import User from '../models/User';

import IUsersRepository from '../repositories/IUsersRepository';
import container from '../repositories';

interface IRequest {
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = container.getUsersRepository();
  }

  async execute({ email, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('There is another user with that email');
    }

    const user = await this.usersRepository.create({ email, password });

    return user;
  }
}

export default CreateUserService;
