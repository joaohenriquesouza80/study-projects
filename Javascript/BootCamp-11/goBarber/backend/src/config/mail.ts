interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'joaohenriquesouza80@zohomail.com',
      name: 'Joao ZOHO',
    },
  },
} as IMailConfig;
