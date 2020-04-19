import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';
import uploadFile from '../config/upload';
import User from '../models/User';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadFile.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    //Salva avatar ou cria se nao tiver ID
    user.avatar = avatarFilename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
