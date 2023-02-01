import appConfig from "@utils/appConfig";
import app from "./app";
import runLoaders from "./loaders";

(async () => {
  await runLoaders(app);
})();

const server = app.listen(appConfig.express.serverPort, () => {
  console.log(`Listening on port ${appConfig.express.serverPort}...`);
});

const gracefulShutdown = (cause: string) => {
  console.log(`Closing HTTP server due to ${cause}.`);
  server.close(() => {
    console.log("HTTP server closed.");
  });
};

process.on("SIGTERM", () => gracefulShutdown("app termination"));
process.on("SIGUSR2", () => gracefulShutdown("ts-node restart"));
process.on("SIGINT", () => gracefulShutdown("app termination"));
