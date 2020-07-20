import Post from '../models/Post';

interface ICreatePostDTO {
  user_id: string;
  title: string;
  content: string;
}

interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | undefined>;
}

export default IPostsRepository;

export { ICreatePostDTO };
