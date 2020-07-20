import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUsersService from '../services/ListUsersService';
import RetrieveUserService from '../services/RetrieveUserService';

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return response.json(classToClass(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email,
      password,
    });

    return response.status(201).json(classToClass(user));
  }

  async retrieve(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const retrieveUser = new RetrieveUserService();

    const user = await retrieveUser.execute(id);

    return response.json(classToClass(user));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute(id);

    return response.status(204).json();
  }
}

export default UsersController;
