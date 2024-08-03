

export default function Dialog({isOpen,ComponentToRender,overlayDispatch}){

    if(isOpen){
      return <ComponentToRender overlayDispatch={overlayDispatch}/>
    }
}