 
 
 function setOuterData(setData){
    
    function addOuterComment(postId){
        setData((preDatas)=>{

          for(let key in preDatas){
            if(preDatas[key].id === postId){
              preDatas[key].comments = preDatas[key].comments + 1;
              break;
            }
           
          }
         return {...preDatas}
        });
    }
    function addOuterLike(postId,userId){
      setData((preDatas)=>{
        for(let key in preDatas){
          if(preDatas[key].id === postId){
            preDatas[key].likes.push(userId);
            break;
          }
        }
       return {...preDatas}
      });
    }
    function removeOuterLike(postId,userId){
      setData((preDatas)=>{
        for(let key in preDatas){
          if(preDatas[key].id === postId){
            preDatas[key].likes = preDatas[key].likes.filter((id)=>id!==userId);
            break;
          }
        }
       return {...preDatas}
      });
    }

    return {
      addOuterComment,
      addOuterLike,
      removeOuterLike
    }
  }

 export {
    setOuterData
 } 