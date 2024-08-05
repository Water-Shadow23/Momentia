import { useForm, useWatch } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { RegisterSchema } from "../../../Validations/authValidation.js"
import useErrorBoundary from "../../../hooks/UseErrorBoundary.jsx";
import useAuth from "../../../hooks/serviceHooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RegisterForm(){  
    const  {
     control,
     register,
     formState:{errors},
     handleSubmit,
     setError,
     clearErrors 
    } = useForm({
      mode:'onSubmit',
      resolver:zodResolver(RegisterSchema)
    })
    const {registerUser} = useAuth();
    const errorDispatch = useErrorBoundary();
    const navigate = useNavigate();
 
    async function onRegisterSubmit(data){
     try{
      await registerUser(data);
      navigate('/');
      
     }catch(err){

        if(err.kind === 'UIError'){
          setError('custom',{
            message:err.message
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

          <form className="auth-form register-form" onSubmit={handleSubmit(onRegisterSubmit)}>

            <div className="form-group">
            <input 
            type="email" 
            name="email" 
            placeholder="Email"
            className="auth-field" 
            {...register('email')}
            />
            {errors.email && <p className="input-error">{errors.email.message}</p>}
            </div> 

            <div className="form-group">
            <input 
            type="text" 
            name="fullName" 
            placeholder="Full Name" 
            className="auth-field" 
            {...register('fullName')}
            />
             {errors.fullName && <p className="input-error">{errors.fullName.message}</p>}
            </div>
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
            value="Sign up" 
            className={`${Object.keys(errors).length ? 'disabled-light-blue-btn' : 'light-blue-btn'}`} 
            disabled={Object.keys(errors).length} 
            />

         </form>
       
    )
}