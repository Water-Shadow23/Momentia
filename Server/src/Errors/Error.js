
class ServiceError extends Error{
    name = '';
    constructor(message = 'Service Error'){
      super(message);
      this.name = 'ServiceError';
    }
}


class ServerError extends ServiceError{
    name = '';
    status = '';
    constructor(message = 'Server Error'){
      super(message);
      this.name = 'ServerError';
      this.status = 'internalFail'  
    }
}

class ClientError extends ServiceError{
    name = '';
    status = '';
    constructor(message = 'Client Error'){
      super(message);
      this.name = 'ClientError';
      this.status = 'externalFail'; 
    }
}



module.exports = {
    ClientError,
    ServerError
}