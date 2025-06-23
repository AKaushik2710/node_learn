import {Button, Span, Div, Input} from "./Assembler";
import { myContext } from "../App";
import {useRef, useState, useEffect, useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";

interface notes {
    heading: string,
    message: string,
}

export default function Writer(){
    const headingRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const noteFetcher = useContext(myContext);
    // const [notes, setNotes] = useState<notes>({
    //     heading: "",
    //     message: ""
    // });
    // // console.log(note);
    // useEffect(()=>{
    //     fetch("http://localhost:3000/").then(res => res.json())
    //     .then(data => {console.log(data);
    //         const notes:notes = {
    //             heading: data.heading || "",
    //             message: data.message || ""
    //         }
    //         setNotes(notes);
    //     }).catch(err => console.error("Error fetching notes:", err));
        
    // },[])
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setNote({
    //         heading: headingRef.current ? headingRef.current.value : "",
    //         message: messageRef.current ? messageRef.current.value : ""
    //     });
    //     headingRef.current && (headingRef.current.value = "");
    //     messageRef.current && (messageRef.current.value = "");
    // }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote = {
        heading: headingRef.current ? headingRef.current.value : "",
        message: messageRef.current ? messageRef.current.value : ""
    };

    // Send the note to backend
    fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    })
    .then(res => res.json())

    // Clear inputs
    if (headingRef.current) headingRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
    noteFetcher(); // Fetch notes again to update the list
}

    return <form className="flex flex-col w-3/5 border-1 border-teal-200 h-full" onSubmit={handleSubmit}>
        <Div cn="flex justify-start items-center w-full h-1/7">
            <Input cn="text-2xl p-2 m-1 h-3/4 w-5/6 ml-6 caret-pink-600" ref={headingRef} holder="Heading...."></Input>
            <Button cn="text-2xl p-2 text-pink-500 h-3/4 border-1 w-1/9 cursor-pointer text-center" type="submit">
                <FontAwesomeIcon icon={faCircleCheck} />
            </Button>
        </Div>
        <Div cn=" h-6/7 border-1">
            <textarea className="text-xl w-[97%] h-[96%] p-2 m-3 border-1" ref={messageRef} placeholder="Start Writing...."></textarea>
        </Div>
    </form>
}