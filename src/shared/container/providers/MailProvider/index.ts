import EtherealMailProvider from "./implementations/EtherealMailProvider";
import { container } from "tsyringe";
import SESMailProvider from "./implementations/SESMailProvider";
import IMailProvider from "../MailProvider/models/IMailProvider";
import mailConfig from "@config/mail";

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  providers[mailConfig.driver]
);
