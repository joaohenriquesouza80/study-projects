import User from '../models/User';

import IUsersRepository from '../repositories/IUsersRepository';
import container from '../repositories';

class ListUsersService {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = container.getUsersRepository();
  }

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}

export default ListUsersService;
