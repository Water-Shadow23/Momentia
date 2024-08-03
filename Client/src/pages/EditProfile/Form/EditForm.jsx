import { useEffect, useRef, useState } from "react";
import Select from 'react-select';

import {useForm,Controller,useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { ProfileSchema } from "../../../Validations/profileValidation.js";

import { genderOptionsStyles } from '../genderOptions/optionsStyles.js'
import { genderOptionsData } from '../genderOptions/optionsData.js';
import {checkChanges } from "../../../utils/form.js";
import useCharCounter from "../../../hooks/useCharCounter.jsx";




//you can try to add field array in future to extract the input info into seperate file
export default function EditForm() {
   const [isChanged,setIsChanged] = useState(false);
   const [formDefaultValues,setFormDefaultValues] = useState(
      {
         website:'',
         fullName:'George Manov',
         job:'Developer',
         bio:'I am hundred',
         gender:'preferNotToSay'
      } 
   );  
   const {
      formState:{errors,defaultValues},
      register,
      setError,
      reset,
      trigger,
      control,
      handleSubmit} = useForm({
         defaultValues:formDefaultValues,
         resolver:zodResolver(ProfileSchema),
         mode:'onChange'
      }); 
      
   const [chars,charCounter] = useCharCounter(defaultValues.bio.length);
   const values =  useWatch({
     control:control,
    });
   
   useEffect(()=>{
     const changed = checkChanges(defaultValues,values);
       if(changed){
        setIsChanged(true);
       }else if(!changed || Object.keys(errors).length){
        setIsChanged(false);
       }
       
      },[values,errors]); 
    
    
   async function onSubmit(data){
     console.log(data);
   }

   
   return (
      <form className="edit-profile-form" onSubmit={handleSubmit(onSubmit)}>

         <div className="form-group">
         <label htmlFor="website">Website</label>
         <input 
         type="text" 
         id="website" 
         name="website" 
         className="website" 
         placeholder="Website"
         {...register('website')}  
             
         />
         {errors.website && <p className="input-error">{errors.website.message}</p>}
         </div>    

         <div className="form-group">
         <label htmlFor="fullName">Full Name</label>
         <input 
         type="text" 
         name="fullName" 
         className="fullName" 
         id="fullName" 
         placeholder="Name"
         {...register('fullName')}
        
         />
         {errors.fullName && <p className="input-error">{errors.fullName.message}</p>}
         </div>
          
         <div className="form-group">
         <label htmlFor="job">Job</label>
         <input 
         type="text" 
         name="job" 
         className="job" 
         id="job" 
         placeholder="Job"
         {...register('job')}  
         />
         {errors.job && <p className="input-error">{errors.job.message}</p>}
         </div>

         <div className="form-group">
         <label htmlFor="bio">Bio</label>

         <div className="textarea-cont">

           <Controller 
           name="bio"
           control={control}
           render={({field:{onChange,onBlur}})=>(
              <textarea 
              maxLength={150}
              id="bio" 
              defaultValue={formDefaultValues.bio}
              placeholder="Bio" 
              className="bio" 
               onBlur={onBlur}
               onChange={(e)=>{
                    charCounter(e);
                    onChange(e.target.value);
                 }}
              ></textarea>
           )}
           />
            
            <div className="char-counter-absolute-cont">
               <div className="char-counter">
                  <p>
                     <span
                     >{chars}</span>/150
                  </p>
               </div>
            </div>

         </div>
         {errors.bio && <p className="input-error">{errors.bio.message}</p>}
         </div>
         
         <label htmlFor="genders">Gender</label>
         <Controller 
         name="gender"
         control={control}
          render={({field:{onChange}})=>(
             <Select id="genders" className="genders"
               
                onChange={(entry)=>{
                  onChange(entry.value)
                }}
                defaultValue={()=>{
                  return genderOptionsData.find(entry=>entry.value===formDefaultValues.gender);
                }}
                options={genderOptionsData}
                styles={genderOptionsStyles}
                isSearchable={'false'}
                classNamePrefix='genders'
             />
          )}
         />
         <input 
         type="submit" 
         className={`blue-btn submit-edit ${Object.keys(errors).length || !isChanged   ? 'disabled' : ''}`} 
         value="Submit" 
         disabled={!isChanged || Object.keys(errors).length}
         />
      </form>
   )
}