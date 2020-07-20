import IUsersRepository from '../repositories/IUsersRepository';
import container from '../repositories';

class DeleteUserService {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = container.getUsersRepository();
  }

  async execute(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
