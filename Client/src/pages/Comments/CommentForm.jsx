import { useRef } from "react";
import useForm from "../../hooks/useForm.jsx"
import { sanitiseData } from "../../utils/form.js";
import { z } from 'zod';

const commentSchema = z.object({
  content:z.string()
  .min(1) 
});

export default  function CommentForm(props){

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

    function onCommentSubmit(){
      const normalisedData = sanitiseData(formData);
      console.log(normalisedData);   
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
    