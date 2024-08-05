import {z} from 'zod';
import { fullName } from './global.js';
import { regexTextValidations } from '../utils/form.js';
const {checkRegex,regexOnlyLetters} = regexTextValidations();

const LoginSchema = z.object({
 username:z.string()
 .trim()
 .min(1,'Username is required!')
 ,
 password:z.string()
 .trim()
 .min(4,'Password must be at least 4 characters long')
 .max(30,'Password must be no more than 30 characters long')
 ,
});

const RegisterSchema = LoginSchema.extend({
 fullName:fullName,
 email:z.string()
 .trim()
 .min(1,'Email is required!')
 .email('Invalid email address')
 ,
});

export{
    LoginSchema,
    RegisterSchema,
}