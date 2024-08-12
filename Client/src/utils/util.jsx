 
 
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
    function removeOuterComment(postId){
      setData((preData)=>{
        for(let key in preData){
          if(preData[key].id === postId){
            preData[key].comments = preData[key].comments - 1;
            break;
          }
        }
       return {...preData}
        });
  }

    return {
      addOuterComment,
      addOuterLike,
      removeOuterLike,
      removeOuterComment
    }
  }

 export {
    setOuterData
 } 