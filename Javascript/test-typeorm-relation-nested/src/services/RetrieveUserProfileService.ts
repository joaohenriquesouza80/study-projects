import AppError from '../error/AppError';

import UserProfile from '../models/UserProfile';

import IUserProfilesRepository from '../repositories/IUserProfilesRepository';
import container from '../repositories';

class RetrieveUserProfileService {
  private userProfilesRepository: IUserProfilesRepository;

  constructor() {
    this.userProfilesRepository = container.getUserProfilesRepository();
  }

  async execute(id: string): Promise<UserProfile | undefined> {
    const userProfile = await this.userProfilesRepository.findById(id);

    if (!userProfile) {
      throw new AppError('User profile not found');
    }

    return userProfile;
  }
}

export default RetrieveUserProfileService;
