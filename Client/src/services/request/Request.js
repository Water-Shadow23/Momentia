
export default class Request{
    url;
    options = {
        method:'',
        headers:{
          'Content-Type': 'application/json',
        },
        
    }
    
    constructor(method,url,body,authKey){
      this.url = url;
      this.options.method = method || '';
      if(method!=='GET' &&  method!=='HEAD'){
        if(body){
          this.options.body = JSON.stringify(body);
        }
      }
      if(authKey){
        this.options.headers['Auth-Key'] = authKey;
      }
    }
    
   async sendToServer(){
     try{
      const res = await fetch(this.url,this.options);
      const data = await res.json();
      if(!data.ok){
       throw data;
      }
      return data;  
    }catch(err){
      throw err;    
    }
   } 
}