interface InputProps{
    cn : string,
    type : string,
    placeholder : string,
    ref : React.RefObject<HTMLInputElement | null>,
    name : string,
}

export default function Input({cn, type, placeholder, ref, name} : InputProps){
    return <input className={cn} type={type} placeholder={placeholder} ref={ref} name={name}></input>
}