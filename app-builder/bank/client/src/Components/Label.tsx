interface LabelProps{
    text : string,
    cn : string,
    for : string
}

export default function Label({text, cn, for: htmlFor} : LabelProps){
    return <label className={cn} htmlFor={htmlFor}>{text}</label>
}