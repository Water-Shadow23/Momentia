const {ClientError} = require('./Error');

class RequestError extends ClientError{
    name = '';
    code;
    constructor(message = 'Bad Request',kind){
      super(message);
      this.name = 'RequestError';
      this.code = 400;
      this.kind = kind;
    }
}
class ValidationError extends RequestError{
  name = "";
  errors = {};
  constructor(message = 'Bad Request',errors,kind){
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
    this.kind = kind;
  }
}
class CredentialError extends ClientError {
    name = '';
    code;
    constructor(message = 'Unauthorized'){
      super(message);
      this.name = 'CredentialError';
      this.code = 401;
    }
}
class AuthorizationError extends ClientError {
    name = '';
    code;
    constructor(message = 'Forbidden'){
      super(message);
      this.name = 'AuthorizationError';
      this.code = 403;
    }
}
class ConflictError extends ClientError{
    name = '';
    code;
    constructor(message = 'Conflict',kind){
      super(message);
      this.name = 'ConflictError';
      this.code = 409;
      this.kind = kind;
    }
}
class NotFoundError extends ClientError{
    name = '';
    code;
    constructor(message = 'Not Found'){
      super(message);
      this.name = 'NotFoundError';
      this.code = 404;
    }
}

module.exports = {
    RequestError,
    CredentialError,
    AuthorizationError,
    ConflictError,
    NotFoundError,
    ValidationError
}