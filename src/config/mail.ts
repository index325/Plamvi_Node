interface IMailConfig {
  driver: "ethereal" | "ses";
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",

  defaults: {
    from: {
      email: "contato@plamvi.com.br",
      name: "Equipe Plamvi",
    },
  },
} as IMailConfig;
