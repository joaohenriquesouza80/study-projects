import AppError from '../error/AppError';

import User from '../models/User';

import IUsersRepository from '../repositories/IUsersRepository';
import container from '../repositories';

class RetrieveUserService {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = container.getUsersRepository();
  }

  async execute(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default RetrieveUserService;
