import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface RequestDTO {
  title: string;
  value: number;
  type: string;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    // Check if Income or Outcome
    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Type must be income or outcome');
    }

    // When outcome, Check if value is lower of total income
    if (type === 'outcome') {
      const balance = await transactionRepository.getBalance();
      if (value > balance.total) {
        throw new AppError('Outcome value is bigger than total amount');
      }
    }

    // Check if a category exists
    const categoryRepository = getRepository(Category);
    let _category = await categoryRepository.findOne({
      where: { title: category },
    });
    if (!_category) {
      // Create new one
      _category = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(_category);
    }

    // Create new Transaction
    const newTransaction = transactionRepository.create({
      title,
      type,
      value,
      category: _category,
    });
    await transactionRepository.save(newTransaction);
    return newTransaction;
  }
}

export default CreateTransactionService;
