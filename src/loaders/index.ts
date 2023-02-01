import { Application } from "express";
import loadExpress from "./express";

const runLoaders = async (app: Application) => {
  console.log("Starting application...");

  await loadExpress({ app });
  console.log("Express initialized.");
};

export default runLoaders;
