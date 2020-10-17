import { container } from "tsyringe";
import IRandomNumberProvider from "./models/IRandomNumberProvider";
import RandomNumberManualGeneration from "./implementations/ManualGeneration";

container.registerSingleton<IRandomNumberProvider>(
  "RandomNumberManualGeneration",
  RandomNumberManualGeneration,
);
