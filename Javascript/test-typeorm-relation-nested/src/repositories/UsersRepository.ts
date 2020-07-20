import { getRepository, Repository } from 'typeorm';

import User from '../models/User';

import IUsersRepository, { ICreateUserDTO } from './IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }
}

export default UsersRepository;
