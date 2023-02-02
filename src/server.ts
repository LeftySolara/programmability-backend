import appConfig from "@utils/appConfig";
import ErrorHandler from "@utils/errors/errorHandler";
import logger from "@utils/logger";
import app from "./app";
import runLoaders from "./loaders";

(async () => {
  await runLoaders(app);
})();

const server = app.listen(appConfig.express.serverPort, () => {
  logger.info(
    { port: appConfig.express.serverPort },
    "Listening on port %s...",
    appConfig.express.serverPort,
  );
});

const gracefulShutdown = (cause: string) => {
  logger.info({ cause }, "Closing HTTP server due to %s.", cause);
  server.close(() => {
    logger.info("HTTP server closed.");
  });
};

process.on("uncaughtException", (err) => {
  logger.error(err);
  ErrorHandler.handleError(err, null);
});

process.on("unhandledRejection", (err) => {
  logger.error(err);
  ErrorHandler.handleError(err as Error, null);
});

process.on("SIGTERM", () => gracefulShutdown("app termination"));
process.on("SIGUSR2", () => gracefulShutdown("ts-node restart"));
process.on("SIGINT", () => gracefulShutdown("app termination"));
