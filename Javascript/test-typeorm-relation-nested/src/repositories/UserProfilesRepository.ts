import { getRepository, Repository } from 'typeorm';

import UserProfile from '../models/UserProfile';

import IUserProfilesRepository, {
  ICreateUserProfileDTO,
} from './IUserProfilesRepository';

class UserProfilesRepository implements IUserProfilesRepository {
  private ormRepository: Repository<UserProfile>;

  constructor() {
    this.ormRepository = getRepository(UserProfile);
  }

  async create({
    user_id,
    name,
    contact_email,
  }: ICreateUserProfileDTO): Promise<UserProfile> {
    const userProfile = this.ormRepository.create({
      user_id,
      name,
      contact_email,
    });
    await this.ormRepository.save(userProfile);
    return userProfile;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findAll(): Promise<UserProfile[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<UserProfile | undefined> {
    return this.ormRepository.findOne(id);
  }

  async findByUserId(user_id: string): Promise<UserProfile | undefined> {
    return this.ormRepository.findOne({ where: { user_id } });
  }
}

export default UserProfilesRepository;
