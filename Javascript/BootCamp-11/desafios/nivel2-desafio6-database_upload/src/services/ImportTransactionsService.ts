import path from 'path';
import fs from 'fs';
import csvParser from 'csv-parse';

import Transaction from '../models/Transaction';
import uploadFile from '../config/upload';
import CreateTransactionService from './CreateTransactionService';

interface RequestDTO {
  fileName: string;
}

interface FileStructure {
  title: string;
  type: 'outcome' | 'income';
  value: number;
  category: string;
}

class ImportTransactionsService {
  getRows = (filePath: string): Promise<FileStructure[]> =>
    new Promise(resolve => {
      const rows: FileStructure[] = [];

      fs.createReadStream(filePath)
        .pipe(csvParser({ columns: true, ltrim: true }))
        .on('data', async row => {
          rows.push(row);
        })
        .on('end', () => {
          resolve(rows);
        });
    });

  async execute({ fileName }: RequestDTO): Promise<Transaction[]> {
    const transactions: Transaction[] = [];

    const transactionsFilePath = path.join(uploadFile.directory, fileName);
    const rows = await this.getRows(transactionsFilePath);
    const createTransactionService = new CreateTransactionService();

    await Promise.all(
      rows.map(async row => {
        const transaction = await createTransactionService.execute(row);

        transactions.push(transaction);
      }),
    );

    // await fs.promises.unlink(transactionsFilePath);

    return transactions;
  }
}

export default ImportTransactionsService;
