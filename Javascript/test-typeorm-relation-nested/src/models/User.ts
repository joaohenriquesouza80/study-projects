import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Post from './Post';
import UserProfile from './UserProfile';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => UserProfile, (user_profile) => user_profile.user)
  user_profile: UserProfile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

export default User;
