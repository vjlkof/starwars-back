class BaseException extends Error {
  status;
  internal;
  message;
  constructor(status, internal, message) {
    super(message);
    this.status = status || 500;
    this.internal = internal || "generic_error";
    this.message = message || "Error";
  }
}

export default BaseException;
