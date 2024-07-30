

export default function Dialog({isOpen,ComponentToRender}){

    if(isOpen){
      return <ComponentToRender />
    }
}