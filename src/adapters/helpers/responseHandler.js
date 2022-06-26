const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  UNFORBBIDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const prepareAndSendResponse = (res, statusCode, error, message) => {
  const ok = statusCode >= 400 ? false : true;
  const messageLabel = ok ? 'message' : 'error';
  if (statusCode === 500) {
    message = 'Hable con el administrador.';
    console.log(error);
  }
  const body = { ok, [messageLabel]: message };
  res.status(statusCode).json(body);
};

const prepareAndSendDataResponse = (res, statusCode, data) => {
  const ok = statusCode >= 400 ? false : true;
  const body = { ok, data };
  res.status(statusCode).json(body);
};

const prepareAndSendMsgAndDataResponse = (res, statusCode, message, data) => {
  const ok = statusCode >= 400 ? false : true;
  const body = { ok, message, data };
  res.status(statusCode).json(body);
};

module.exports = {
  HttpStatus,
  prepareAndSendDataResponse,
  prepareAndSendResponse,
  prepareAndSendMsgAndDataResponse,
};
