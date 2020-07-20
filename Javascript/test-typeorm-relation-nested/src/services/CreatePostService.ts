import Post from '../models/Post';

import IPostsRepository from '../repositories/IPostsRepository';
import container from '../repositories';

interface IRequest {
  user_id: string;
  title: string;
  content: string;
}

class CreatePostService {
  private postsRepository: IPostsRepository;

  constructor() {
    this.postsRepository = container.getPostsRepository();
  }

  async execute({ user_id, title, content }: IRequest): Promise<Post> {
    return this.postsRepository.create({ user_id, title, content });
  }
}

export default CreatePostService;
