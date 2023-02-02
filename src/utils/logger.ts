import pino from "pino";
import appConfig from "./appConfig";

const logger = pino({
  level: appConfig.logger.logLevel as string,
});

export default logger;
