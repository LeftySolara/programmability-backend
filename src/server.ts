import app from "./app";
import runLoaders from "./loaders";

(async () => {
  await runLoaders(app);
})();

const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
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
