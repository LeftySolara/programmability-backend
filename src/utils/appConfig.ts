import dotenv from "dotenv";

export interface IAppConfig {
  express: {
    serverPort: string | undefined;
    corsOrigin: string | undefined;
  };
}

/* Load environment variables. If we're not running in a production environment, then
 * get the variables from a .env file. Otherwise, use the deployed environment. */
if (
  process.env.NODE_ENV !== "production" &&
  process.env.NODE_ENV !== "testci"
) {
  const configOutput = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  if (configOutput.error) {
    throw new Error("Error loading environment variables");
  }
}

const appConfig: IAppConfig = {
  express: {
    serverPort: process.env.SERVER_PORT,
    corsOrigin: process.env.CORS_ORIGIN,
  },
};

export default appConfig;
