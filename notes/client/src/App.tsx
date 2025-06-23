import { useState, useEffect, createContext } from 'react'
import Writer from './Components/Writer'
import {Div, Input, Button, Span} from './Components/Assembler'

interface notes {
  heading: string,
  message: string
}
const myContext = createContext<()=> void>(() => {});
function App() {
  // const [count, setCount] = useState(0)
      const [notes, setNotes] = useState<Array<notes>>([]);
      const fetchNotes = ()=>{fetch("http://localhost:3000/").then(res => res.json())
        .then(data => {console.log(data);
            const notes:Array<notes> = data.map((note: { title: string, content: string }) => ({
                heading: note.title,
                message: note.content
            }));
            console.log(notes);
            setNotes(notes);
        }).catch(err => console.error("Error fetching notes:", err));
      }
      
    useEffect(()=>{
        fetchNotes();
    },[])
    // console.log(notes);
  return (
    <Div cn="flex bg-black text-white w-full h-screen">
      <Div cn="grid w-20 border-1">
        <Button>Notes</Button>
        <Button>Folders</Button>
        <Button>Settings</Button>
      </Div>
      <Div cn='flex flex-col w-full border-1 border-teal-200 h-full overflow-hidden'>
        <Div cn=" flex w-full h-full">
          <Div cn='w-2/5 border-1 h-full'>
            <Div cn="flex w-full justify-between  h-1/7">
              <Span>Notes</Span>
              <Span>C</Span>
            </Div>
            <Div cn="flex flex-col h-6/7 border-1">
              {notes.map((note,index) =>{
                return <Span cn='text-rose-700' key={index}>{note.heading}</Span>
              })}
            </Div>
          </Div>
          <myContext.Provider value={ fetchNotes}>
          <Writer />
          </myContext.Provider>
        </Div>
      </Div>
    </Div>
  )
}

export {App, myContext};
