import IRandomNumberGenerateDTO from "../dtos/IRandomNumberGenerateDTO";
import IRandomNumberProvider from "../models/IRandomNumberProvider";

class ManualGeneration implements IRandomNumberProvider {
  public generate({
    max,
    min,
    characterQuantity,
  }: IRandomNumberGenerateDTO): string {
    let recovery_code = String(Math.floor(Math.random() * (max - min + 1) + min));

    recovery_code = recovery_code.padStart(characterQuantity, '0')

    return recovery_code;
  }
}

export default ManualGeneration;
