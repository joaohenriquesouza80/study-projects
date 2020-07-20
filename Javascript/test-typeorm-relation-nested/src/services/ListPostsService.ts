import Post from '../models/Post';

import IPostsRepository from '../repositories/IPostsRepository';
import container from '../repositories';

class ListPostsService {
  private postsRepository: IPostsRepository;

  constructor() {
    this.postsRepository = container.getPostsRepository();
  }

  async execute(): Promise<Post[]> {
    return this.postsRepository.findAll();
  }
}

export default ListPostsService;
