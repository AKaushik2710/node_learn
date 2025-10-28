interface SpanProps{
    children : string,
    cn : string
}

export default function Span({children, cn} : SpanProps){
    return <span className={cn}>{children}</span>
}