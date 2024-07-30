
function tryCatchAsync(controller) {
  return (req, res, next) => {
    controller(req,res)  
      .then(() => {
        next();
      })
      .catch((err) => {
        res
          .status(err.code)
          .json({ code: err.code, 
                  name: err.name, 
                  message: err.message,
                  errors:err.errors,
                  kind:err.kind 
                });
      });
  };
}

function tryCatch(controller) {
  return (req, res, next) => {
    try{
      controller(req,res);
      next();
    }catch(err){
      res
      .status(err.code)
      .json({ code: err.code, 
              name: err.name, 
              message: err.message,
              errors:err.errors,
              kind:err.kind 
            });
    }
  };
}

function tryCatchAsyncEnd(controller){
  return (req, res) => {
    controller(req,res)  
      .then(() => {
        
      })
      .catch((err) => {
        res
          .status(err.code)
          .json({ code: err.code, 
                  name: err.name, 
                  message: err.message,
                  errors:err.errors,
                  kind:err.kind
                 });
      });
  };
}

function tryCatchEnd(controller){
  return (req, res) => {
    try{
      controller(req,res);
    }catch(err){
      res
      .status(err.code)
      .json({ code: err.code, 
              name: err.name, 
              message: err.message,
              errors:err.errors,
              kind:err.kind 
            });
    }
  };
}



module.exports = {
  tryCatch,
  tryCatchAsync,
  tryCatchEnd,
  tryCatchAsyncEnd
};
