import User from '../models/User';

interface ICreateUserDTO {
  email: string;
  password: string;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default IUsersRepository;

export { ICreateUserDTO };
