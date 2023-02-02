import pino from "pino";
import appConfig from "./appConfig";

const streams = [
  { stream: process.stdout },
  {
    stream: pino.destination({
      dest: appConfig.logger.logLocation,
      minLength: 4096,
      sync: false,
    }),
  },
];

const logger = pino(
  {
    level: appConfig.logger.logLevel as string,
  },
  pino.multistream(streams),
);

export default logger;
