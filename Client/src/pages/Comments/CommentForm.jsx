import { useRef } from "react";
import useForm from "../../hooks/useForm.jsx"
import { sanitiseData } from "../../utils/form.js";
import { z } from 'zod';
import isBadRequest from "../../utils/errorHandler.js";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import { errorConstants } from "../../constants/dispatchConstants.js";
import usePostDetail from "../../hooks/serviceHooks/usePostDetail.jsx";

const commentSchema = z.object({
  content:z.string()
  .min(1) 
});

export default  function CommentForm(props){
   
  const {errorDispatch} = useErrorBoundary();
  const {createComment} = usePostDetail();

   const {
    formData,
    onFieldChange,
    onFormSubmit,
    errors
    } = useForm({
     content:'' 
   },commentSchema,{
    mode:'onChange'
   });
      
   

    async function onCommentSubmit(){
      const normalisedData = sanitiseData(formData);
      try{
        const commentResData = await createComment(props.postId,normalisedData);
        if(props.hasOwnProperty('addPostComment')){
           props.addPostComment(commentResData.data);
        }
       inputField.current.value = '';   
      }catch(err){
        if(!isBadRequest(err)){
          errorDispatch({
              typeAction:errorConstants.SET_ERROR,
              error:err
            });
        }
      }   
    }
    

    return (
      <form className="add-comment-form" onSubmit={(e)=>onFormSubmit(e,onCommentSubmit)}>
        <input 
        type="text" 
        placeholder="Add a comment..."  
        name="content"
        
        onChange={(e)=>{
          onFieldChange(e);
           
        }}
        />
        <input 
        type="submit" 
        className={`post-comment 
          ${errors.status==='initial' || errors.status==='error' 
            ? 'disabled' : ''}`} 
        value="Post" 
        disabled={
        errors.status==='initial' || errors.status==='error' 
          ? true : false
        }
        style={{
          visibility:
          props.options?.isInitialSubmitBtnHidden 
          && (errors.status==='initial' || errors.status==='error') 
          ? 'hidden' : 'visible'
        }}
        />
      </form>
    )
   } 
    