import { z } from 'zod';
import { regexTextValidations } from '../utils/form.js';
const {checkRegex,regexOnlyLetters} = regexTextValidations();

const fullName = z.string()
.trim()
.min(1,'Full Name is required')
.regex(regexOnlyLetters,{message:'Special characters and numbers are not allowed.'});



export {
    fullName
}