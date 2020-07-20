import AppError from '../error/AppError';

import UserProfile from '../models/UserProfile';

import IUserProfilesRepository from '../repositories/IUserProfilesRepository';
import container from '../repositories';

interface IRequest {
  user_id: string;
  name: string;
  contact_email: string;
}

class CreateUserProfileService {
  private userProfilesRepository: IUserProfilesRepository;

  constructor() {
    this.userProfilesRepository = container.getUserProfilesRepository();
  }

  async execute({
    user_id,
    name,
    contact_email,
  }: IRequest): Promise<UserProfile> {
    const userProfileExists = await this.userProfilesRepository.findByUserId(
      user_id,
    );

    if (userProfileExists) {
      throw new AppError('The user already has a profile');
    }

    const userProfile = await this.userProfilesRepository.create({
      user_id,
      name,
      contact_email,
    });

    return userProfile;
  }
}

export default CreateUserProfileService;
