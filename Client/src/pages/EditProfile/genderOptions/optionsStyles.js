

export const  genderOptionsStyles = {
    control:()=>({
       backgroundColor:'inherit',
       border:'none',
       borderRadius:'.9rem',
       display:'flex',
       paddingInline:'.5rem',
       paddingBlock:'.5rem',
     }),
    menu:()=>({
      backgroundColor:'hsla(0, 0%, 11%, 0.534)',
      position:'absolute',
      right:'0',
      left:'0',
      
    }),
    option:(styles,state)=>({
      ...styles,
      borderRadius:'.5rem',
      paddingBlock:'.7rem',
      backgroundColor:  
      state.isSelected ? 'var(--clr-medium-dark-blue)' 
      : state.isFocused ? 'hsl(0, 0%, 13%)' 
      : '',
      ':active':{
       backgroundColor:'hsl(0, 0%, 20%)'
      }
    }),
    singleValue:(styles)=>({
       ...styles,
       color:'var(--p-light)'
    }) 
}