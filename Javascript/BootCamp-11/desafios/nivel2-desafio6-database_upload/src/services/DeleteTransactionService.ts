import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const checkTransactionExists = await transactionRepository.findOne(id);
    if (!checkTransactionExists) {
      throw new AppError('Transaction not found');
    }

    await transactionRepository.remove(checkTransactionExists);
  }
}

export default DeleteTransactionService;
