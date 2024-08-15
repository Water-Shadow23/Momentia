import { forwardRef, useImperativeHandle, useRef } from "react";
import useForm from "../../hooks/useForm.jsx"
import { sanitiseData } from "../../utils/form.js";
import { z } from 'zod';
import isBadRequest from "../../utils/errorHandler.js";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import { errorConstants } from "../../constants/dispatchConstants.js";
import usePostDetail from "../../hooks/serviceHooks/usePostDetail.jsx";
import { CommentFormData } from "./CommentFormData.js";

const commentSchema = z.object({
  content:z.string()
  .min(1) 
});

  const CommentForm = forwardRef(function(props,ref){
   
  const {errorDispatch} = useErrorBoundary();
  const {createComment,editComment} = usePostDetail();
  
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
   
   const inputRef = useRef(null);
   const comdIdRef = useRef(null);
   const submitRef = useRef(null);
   const formRef = useRef(null);
   const cancelRef = useRef(null);

   

    async function onCommentSubmit(){
      const normalisedData = sanitiseData(formData);
      try{
        
        if(formRef.current.id === CommentFormData.Create.id){
          const commentResData = await createComment(props.postId,normalisedData);
          props.addComment(commentResData.data);
          
        }else if(formRef.current.id === CommentFormData.Edit.id){
         await editComment(props.postId,comdIdRef.current,normalisedData);
         props.editComment(comdIdRef.current,normalisedData.content);
         convertToCreateForm();
        }
        inputRef.current.value = '';   
      }catch(err){
        if(!isBadRequest(err)){
         console.error(err);
        }
      }   
    }
    
   function convertToEditForm(content,comId){
     inputRef.current.value = content;
     inputRef.current.focus();
     inputRef.current.placeholder = CommentFormData.Edit.placeholder
     submitRef.current.value = CommentFormData.Edit.submitButtonContent;
     formRef.current.id = CommentFormData.Edit.id;
     cancelRef.current.style.display = 'block'
     comdIdRef.current = comId;
   }
   function convertToCreateForm(){
    inputRef.current.value = '';
    inputRef.current.placeholder = CommentFormData.Create.placeholder
    submitRef.current.value = CommentFormData.Create.submitButtonContent;
    formRef.current.id = CommentFormData.Create.id;
    cancelRef.current.style.display = 'none';
    comdIdRef.current = '';
  }

    useImperativeHandle(ref,()=>({
      convertToEditForm,
      convertToCreateForm,
      formState:()=>{
        return {
          inputValue:inputRef.current.value,
          formId:formRef.current.id,
          comId:comdIdRef.current
        }
      }
    }))
     
    
    return (
      <form className="comments-form" 
      onSubmit={(e)=>onFormSubmit(e,onCommentSubmit)}
      id={formRef.current?.id || CommentFormData.Create.id}
      ref={formRef}
      >
        <input 
        type="text" 
        ref={inputRef}
        placeholder={inputRef.current?.placeholder || CommentFormData.Create.placeholder}
        name="content"
        onChange={(e)=>{
          onFieldChange(e);
           
        }}
        />
        <div className="post-btn-group">
        <input 
        ref={submitRef}
        type="submit" 
        className={`post-comment 
          ${errors.status==='initial' || errors.status==='error' 
            ? 'disabled' : ''}`} 
        value={submitRef.current?.value || CommentFormData.Create.submitButtonContent}
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

        <i className="fa-solid fa-xmark cancel-btn" 
        ref={cancelRef}
        style={{
          display:'none'
        }}
        onClick={()=>{
          convertToCreateForm();
        }}
        />
       
        </div>
      </form>
    )
   } 
  )

  export default CommentForm