


function cors(access){
    return (req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin',access.origin);
        res.setHeader('Access-Control-Allow-Methods',['GET','POST','PUT','PATCH','DELETE','OPTIONS']);
        res.setHeader('Access-Control-Allow-Headers',['Content-Type','Auth-Key']);

        next();
    }
}


module.exports = {
    cors
}