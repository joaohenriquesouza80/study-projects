import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCrypHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCrypHashProvider);
