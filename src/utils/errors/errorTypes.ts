type HttpCode = number;

interface CommonErrorName {
  ok: string;
  notFound: string;
  internalServerError: string;
}

interface CommonHttpError {
  ok: HttpCode;
  notFound: HttpCode;
  internalServerError: HttpCode;
}

const commonErrorNames: CommonErrorName = {
  ok: "ok",
  notFound: "Not found",
  internalServerError: "Internal server error",
};

const commonHttpErrors: CommonHttpError = {
  ok: 200,
  notFound: 404,
  internalServerError: 500,
};

export {
  HttpCode,
  CommonHttpError,
  CommonErrorName,
  commonHttpErrors,
  commonErrorNames,
};
