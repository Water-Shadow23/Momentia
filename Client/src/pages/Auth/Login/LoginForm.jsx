import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { LoginSchema } from "../../../Validations/authValidation.js"

export default function LoginForm(){
    const  {
        control,
        register,
        formState:{errors},
        handleSubmit,
   
       } = useForm({
         mode:'onSubmit',
         resolver:zodResolver(LoginSchema)
       }) 
    
    async function onLoginSubmit(data){
      console.log(data);
    }

    return (
   
          <form className="auth-form login-form" onSubmit={handleSubmit(onLoginSubmit)}>
         
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
             type="password" 
             name="password" 
             placeholder="Password" 
             className="auth-field" 
             {...register('password')}
             />
            {errors.password && <p className="input-error" style={{textAlign:'center'}}>{errors.password.message}</p>}
            </div>
           
            <p className="input-grand-error"></p>    
             
             <input 
             type="submit" 
             value="Log in" 
             className={`${Object.keys(errors).length ? 'disabled-light-blue-btn' : 'light-blue-btn'}`}
             disabled={Object.keys(errors).length} 
             />

          </form>
           
    )
}