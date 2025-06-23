interface SpanProps {
    children: React.ReactNode,
    cn: string
}

export default function Span(props: SpanProps){
    const { children, cn } = props;
    return (
        <span className={cn}>
            {children}
        </span>
    );
}