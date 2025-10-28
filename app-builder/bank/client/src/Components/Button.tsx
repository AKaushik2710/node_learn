interface ButtonProps{
    children : React.ReactElement | string
    onClick : ()=> void,
    cn : string
}

export default function Button({children, onClick, cn} : ButtonProps){
    return <button onClick={onClick} className={cn}>{children}</button>
}