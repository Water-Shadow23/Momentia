 
 
 function setOuterData(setData){
    
    function addCommentPlus(postId){
        setData((preDatas)=>{

          for(let key in preDatas){
            if(preDatas[key]._id === postId){
              preDatas[key].comments = preDatas[key].comments + 1;
              break;
            }
           
          }
         return {...preDatas}
        });
    }
    function addLikePlus(postId,userId){
      setData((preDatas)=>{
        for(let key in preDatas){
          if(preDatas[key]._id === postId){
            preDatas[key].likes.push(userId);
            break;
          }
        }
       return {...preDatas}
      });
    }
    function removeLikeMinus(postId,userId){
      setData((preDatas)=>{
        for(let key in preDatas){
          if(preDatas[key]._id === postId){
            preDatas[key].likes = preDatas[key].likes.filter((id)=>id!==userId);
            break;
          }
        }
       return {...preDatas}
      });
    }

    return {
      addCommentPlus,
      addLikePlus,
      removeLikeMinus
    }
  }

 export {
    setOuterData
 } 