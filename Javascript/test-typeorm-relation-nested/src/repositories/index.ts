import PostsRepository from './PostsRepository';
import UsersRepository from './UsersRepository';
import UserProfilesRepository from './UserProfilesRepository';

class Container {
  private postsRepository: PostsRepository;

  private usersRepository: UsersRepository;

  private userProfilesRepository: UserProfilesRepository;

  getPostsRepository() {
    if (!this.postsRepository) {
      this.postsRepository = new PostsRepository();
    }
    return this.postsRepository;
  }

  getUsersRepository() {
    if (!this.usersRepository) {
      this.usersRepository = new UsersRepository();
    }
    return this.usersRepository;
  }

  getUserProfilesRepository() {
    if (!this.userProfilesRepository) {
      this.userProfilesRepository = new UserProfilesRepository();
    }
    return this.userProfilesRepository;
  }
}

export default new Container();
