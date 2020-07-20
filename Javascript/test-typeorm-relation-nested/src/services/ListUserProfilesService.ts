import UserProfile from '../models/UserProfile';

import IUserProfilesRepository from '../repositories/IUserProfilesRepository';
import container from '../repositories';

class ListUserProfilesService {
  private userProfilesRepository: IUserProfilesRepository;

  constructor() {
    this.userProfilesRepository = container.getUserProfilesRepository();
  }

  async execute(): Promise<UserProfile[]> {
    return this.userProfilesRepository.findAll();
  }
}

export default ListUserProfilesService;
