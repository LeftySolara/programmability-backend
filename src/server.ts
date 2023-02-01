import appConfig from "@utils/appConfig";
import logger from "@utils/logger";
import app from "./app";
import runLoaders from "./loaders";

(async () => {
  await runLoaders(app);
})();

const server = app.listen(appConfig.express.serverPort, () => {
  logger.info(`Listening on port ${appConfig.express.serverPort}...`);
});

const gracefulShutdown = (cause: string) => {
  logger.info(`Closing HTTP server due to ${cause}.`);
  server.close(() => {
    logger.info("HTTP server closed.");
  });
};

process.on("SIGTERM", () => gracefulShutdown("app termination"));
process.on("SIGUSR2", () => gracefulShutdown("ts-node restart"));
process.on("SIGINT", () => gracefulShutdown("app termination"));
