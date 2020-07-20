import IUserProfilesRepository from '../repositories/IUserProfilesRepository';
import container from '../repositories';

class DeleteUserProfileService {
  private userProfilesRepository: IUserProfilesRepository;

  constructor() {
    this.userProfilesRepository = container.getUserProfilesRepository();
  }

  async execute(id: string): Promise<void> {
    await this.userProfilesRepository.delete(id);
  }
}

export default DeleteUserProfileService;
