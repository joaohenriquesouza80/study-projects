import { Request, Response } from 'express';

import CreatePostService from '../services/CreatePostService';
import DeletePostService from '../services/DeletePostService';
import ListPostsService from '../services/ListPostsService';
import RetrievePostService from '../services/RetrievePostService';

class PostsController {
  async index(request: Request, response: Response): Promise<Response> {
    const listPosts = new ListPostsService();

    const posts = await listPosts.execute();

    return response.json(posts);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { user_id, title, content } = request.body;

    const createPost = new CreatePostService();

    const post = await createPost.execute({
      user_id,
      title,
      content,
    });

    return response.status(201).json(post);
  }

  async retrieve(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const retrievePost = new RetrievePostService();

    const post = await retrievePost.execute(id);

    return response.json(post);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePost = new DeletePostService();

    await deletePost.execute(id);

    return response.status(204).json();
  }
}

export default PostsController;
