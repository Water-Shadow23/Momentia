
class ServiceError extends Error{
    name = '';
    constructor(message = 'Service Error'){
      super(message);
      this.name = 'ServiceError';
    }
}


class ServerError extends ServiceError{
    name = '';
    type = '';
    constructor(message = 'Server Error'){
      super(message);
      this.name = 'ServerError';
      this.type = 'internalFail'  
    }
}

class ClientError extends ServiceError{
    name = '';
    type = '';
    constructor(message = 'Client Error'){
      super(message);
      this.name = 'ClientError';
      this.type = 'externalFail'; 
    }
}



module.exports = {
    ClientError,
    ServerError
}