

function checkChanges(oldValues,newValues){
 for(let key in oldValues){
   if(oldValues[key] !== newValues[key]){
    return true;
   }
 } 
 return false;
}

function regexTextValidations(){
  const regexOnlyLetters = new RegExp(/^[ \p{L}]+$/,'u');
  const regexLettersAndNumbers = new RegExp(/^[0-9 \p{L}]+$/,'u');

  const checkRegex = (regex) => (value)=>{
      if(!value.length){
        return true
      }else{
        return regex.test(value);
      }
  };

 return {
  checkRegex,
  regexOnlyLetters,
  regexLettersAndNumbers
 }
}

function sanitiseData(data){
  //triming every entry of data
  for(let key in data){
    data[key] = data[key].trim();
  }

  return data;
}

export{
    checkChanges,
    regexTextValidations,
    sanitiseData
}