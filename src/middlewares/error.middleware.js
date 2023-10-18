function errorMiddleware(error, req, res, next) {
  const status = error.status || 500;
  const internal = error.internal || "server_error";
  const message = error.message || "Internal Server Error";
  res.status(status).send({
    message,
    internal,
    status,
  });
}

export default errorMiddleware;
