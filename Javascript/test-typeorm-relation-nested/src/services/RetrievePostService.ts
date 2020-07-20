import AppError from '../error/AppError';

import Post from '../models/Post';

import IPostsRepository from '../repositories/IPostsRepository';
import container from '../repositories';

class RetrievePostService {
  private postsRepository: IPostsRepository;

  constructor() {
    this.postsRepository = container.getPostsRepository();
  }

  async execute(id: string): Promise<Post | undefined> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post not found');
    }

    return post;
  }
}

export default RetrievePostService;
