import { Application, NextFunction, Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
import appConfig from "@utils/appConfig";
import logger from "@utils/logger";
import AppError from "@utils/errors/appError";
import ErrorHandler from "@utils/errors/errorHandler";
import pinoHTTP from "pino-http";

const loadExpress = async ({ app }: { app: Application }) => {
  app.use(bodyParser.json());
  app.use(urlencoded({ extended: true }));

  app.use(pinoHTTP({ logger }));

  /* Add CORS headers to all responses. */
  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      appConfig.express.corsOrigin as string,
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

  app.use(
    /* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
    async (err: AppError, req: Request, res: Response, next: NextFunction) => {
      await ErrorHandler.handleError(err, res);
    },
  );

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return app;
};

export default loadExpress;
