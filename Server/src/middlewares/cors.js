


function cors(access){
    return (req,res,next)=>{
       
        
        res.setHeader('Access-Control-Allow-Origin', access.origin);
        res.setHeader('Access-Control-Allow-Methods', access.methods || 'GET, POST, OPTIONS, PUT, DELETE, PATCH, HEAD');
        res.setHeader('Access-Control-Allow-Headers', access.headers || '*');

        if(req.method === 'Options'){
            res.sendStatus(204);
        }

            next();         
        
    }
}


module.exports = {
    cors
}