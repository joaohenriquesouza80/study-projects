import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviderService = container.resolve(ListProvidersService);

    const providers = await listProviderService.execute({
      user_id,
    });

    providers.forEach((provider) => {
      delete provider.password;
    });

    return response.json(providers);
  }
}
