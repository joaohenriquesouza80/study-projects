import UserProfile from '../models/UserProfile';

interface ICreateUserProfileDTO {
  user_id: string;
  name: string;
  contact_email: string;
}

interface IUserProfilesRepository {
  create(data: ICreateUserProfileDTO): Promise<UserProfile>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserProfile[]>;
  findById(id: string): Promise<UserProfile | undefined>;
  findByUserId(user_id: string): Promise<UserProfile | undefined>;
}

export default IUserProfilesRepository;

export { ICreateUserProfileDTO };
