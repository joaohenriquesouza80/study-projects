import { Request, Response } from 'express';

import CreateUserProfileService from '../services/CreateUserProfileService';
import DeleteUserProfileService from '../services/DeleteUserProfileService';
import ListUserProfilesService from '../services/ListUserProfilesService';
import RetrieveUserProfileService from '../services/RetrieveUserProfileService';

class UserProfilesController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUserProfiles = new ListUserProfilesService();

    const profiles = await listUserProfiles.execute();

    return response.json(profiles);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { user_id, name, contact_email } = request.body;

    const createUserProfile = new CreateUserProfileService();

    const profile = await createUserProfile.execute({
      user_id,
      name,
      contact_email,
    });

    return response.status(201).json(profile);
  }

  async retrieve(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const retrieveUserProfile = new RetrieveUserProfileService();

    const profile = await retrieveUserProfile.execute(id);

    return response.json(profile);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserProfile = new DeleteUserProfileService();

    await deleteUserProfile.execute(id);

    return response.status(204).json();
  }
}

export default UserProfilesController;
