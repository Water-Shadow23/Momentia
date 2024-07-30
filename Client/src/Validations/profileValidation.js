import { z } from 'zod'
import {fullName} from './global.js'

import {regexTextValidations} from '../utils/form.js';
const {checkRegex,regexOnlyLetters} = regexTextValidations();

export const ProfileSchema = z.object({
 website:z.string()
 .trim()
 .refine((value)=>{
    if(!value.length){
        return true
    }
    try{
     new URL(value);
     return true;
    }catch(err){
       return false; 
    }
 },{message:'Website must contain valid URL address'})
 ,
 fullName:fullName
 ,
 job:z.string()
 .trim()
 .refine(checkRegex(regexOnlyLetters),{message:'Special characters and numbers are not allowed.'})
 ,
 bio:z.string()
 .trim()
 .max(150,'Must contain at most 150 character(s)') 
 ,
 gender:z.enum(['male','female','preferNotToSay'])
 ,
})

// console.log(ProfileSchema.safeParse( {
//     website:'d',
//     fullName:'George Manov',
//     job:'Developer',
//     bio:'I am hundred',
//     gender:'preferNotToSay'
//  } ))