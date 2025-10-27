interface DivProps{
    cn : string,
    children : React.ReactNode,
}

export default function Div({children, cn} : DivProps){
    return <div className={cn}>{children}</div>
}