import IRandomNumberProvider from "../models/IRandomNumberProvider";

class FakeManualGeneration implements IRandomNumberProvider {
  public generate(): string {
    return '12345';
  }
}

export default FakeManualGeneration;
