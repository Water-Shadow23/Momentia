import { useForm, useWatch } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { LoginSchema } from "../../../Validations/authValidation.js"
import useAuth from "../../../hooks/serviceHooks/useAuth.jsx"
import useErrorBoundary from "../../../hooks/UseErrorBoundary.jsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginForm(){
    const  {
        control,
        register,
        formState:{errors},
        handleSubmit,
        setError,
        clearErrors
   
       } = useForm({
         mode:'onSubmit',
         resolver:zodResolver(LoginSchema)
       }) 
    const {loginUser} = useAuth();
    const errorDispatch = useErrorBoundary();
    const navigate = useNavigate();

    async function onLoginSubmit(data){
      try{
        await loginUser(data);
        navigate('/');
        
       }catch(err){
  
          if(err.kind === 'UIError'){
            setError('custom',{
              message:err.message,
              type:'onChange'
            })
          }else{
            errorDispatch({
             typeAction:'setError',
             error:err
           });
          } 
        
       }
    }

    const [values,setValues] = useState();
    const watchValues = useWatch({
      control:control
    }); 
    

    useEffect(()=>{
      setValues(()=>({...watchValues}))
    },[errors.custom]);
    useEffect(()=>{
      for(let key in values){
        if(values[key] !== watchValues[key]){
          clearErrors('custom');
          break;
        }
      }
    },[watchValues])

    return (
   
          <form className="auth-form login-form" onSubmit={handleSubmit(onLoginSubmit)}>
         
            <div className="form-group">
             <input 
             type="text"
             name="username" 
             placeholder="Username" 
             className="auth-field" 
             {...register('username')}
             />
            {errors.username && <p className="input-error">{errors.username.message}</p>}
            </div>
            <div className="form-group">
             <input 
             type="password" 
             name="password" 
             placeholder="Password" 
             className="auth-field" 
             {...register('password')}
             />
            {errors.password && <p className="input-error" style={{textAlign:'center'}}>{errors.password.message}</p>}
            </div>
           
            <p className="input-grand-error">{errors.custom?.message}</p>    
             
             <input 
             type="submit" 
             value="Log in" 
             className={`${Object.keys(errors).length ? 'disabled-light-blue-btn' : 'light-blue-btn'}`}
             disabled={Object.keys(errors).length} 
             />

          </form>
           
    )
}