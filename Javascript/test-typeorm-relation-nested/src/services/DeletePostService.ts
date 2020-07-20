import IPostsRepository from '../repositories/IPostsRepository';
import container from '../repositories';

class DeletePostService {
  private postsRepository: IPostsRepository;

  constructor() {
    this.postsRepository = container.getPostsRepository();
  }

  async execute(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}

export default DeletePostService;
