import IRandomNumberGenerateDTO from "../dtos/IRandomNumberGenerateDTO";

export default interface IRandomNumberProvider {
  generate(data: IRandomNumberGenerateDTO): string;
}
