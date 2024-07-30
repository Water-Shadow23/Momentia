import { useState } from "react";


export default function useForm(initialState,zodSchema,options){
    const [formData,setFormData] = useState({
      ...initialState 
    });
    const [errors,setErrors] = useState({
      status:'initial'
    })

    function onFieldChange(e){
        const newData = e.target.value;
        const name = e.target.name;
        setFormData((preValue)=>{
          preValue[name] = newData;
          return {...preValue}
        });
        
        if(options?.mode === 'onChange'){
          const result = validate({[name]:newData});
          if(result !== true){
            setErrors((preValue)=>{

             return {status:'error'}; 
            });
          }else{
            setErrors({});
          }
        }
    }

    function onFormSubmit(e,submitFunc){
      e.preventDefault();
      submitFunc();
    }

    function validate(data){
      try{
       zodSchema.parse(data);
       return true;
      }catch(errors){
        return errors.issues;
      }
    }

    return {
        formData,
        onFieldChange,
        onFormSubmit,
        validate,
        errors
    }
}