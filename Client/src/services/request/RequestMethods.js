  import Request from "./Request.js";
  
  
  class GetRequest extends Request{
  
    constructor(url,body,authKey){
      super('GET',url,body,authKey);
    }
  }
  
  class PostRequest extends Request{
  
    constructor(url,body,authKey){
      super('POST',url,body,authKey);
    }
  }
  
  class PostRequest extends Request{   
  
    constructor(url,body,authKey){
      super('POST',url,body,authKey);
    }
  }
  
  class PutRequest extends Request{
  
    constructor(url,body,authKey){
      super('PUT',url,body,authKey);
    }
  }
  
  class PatchRequest extends Request{
  
    constructor(url,body,authKey){
      super('PATCH',url,body,authKey);
    }
  }
  class DeleteRequest extends Request{
  
    constructor(url,body,authKey){
      super('DELETE',url,body,authKey);
    }
  }

export {
   GetRequest,
   PostRequest,
   PutRequest,
   PatchRequest,
   DeleteRequest,  
}