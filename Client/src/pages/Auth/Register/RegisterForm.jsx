import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { RegisterSchema } from "../../../Validations/authValidation.js"

export default function RegisterForm(){  
    const  {
     control,
     register,
     formState:{errors},
     handleSubmit,
     setError,

    } = useForm({
      mode:'onSubmit',
      resolver:zodResolver(RegisterSchema)
    })

    async function onRegisterSubmit(data){
     console.log(data);
    }

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

            <p className="input-grand-error"></p>    
               
            <input 
            type="submit" 
            value="Sign up" 
            className={`${Object.keys(errors).length ? 'disabled-light-blue-btn' : 'light-blue-btn'}`} 
            disabled={Object.keys(errors).length} 
            />

         </form>
       
    )
}