interface ButtonProps{
    children : React.ReactElement,
    onClick : ()=> void
}

export default function Button({children, onClick} : ButtonProps){
    return <button onClick={onClick}>{children}</button>
}