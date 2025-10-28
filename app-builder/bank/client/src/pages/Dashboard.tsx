import {Div, Button, Span} from '../Components/Assembler'
import rct from '../../public/vite.svg';
import React, { useState } from 'react';

interface optionDisplay{
    key : string,
    value : boolean
}
interface DashboardProps{
    options : {option : boolean, optionDisplay : optionDisplay[]},
}
export default function Dashboard(){
    const [option, setOption] = useState<DashboardProps>({options :{option : true, optionDisplay : [{key : "deposit", value : false}, {key : "withdraw", value : false}, {key : "transfer", value : false}]}});
    const handleClick = ()=>{
        console.log("Button Clicked");
    }
    return <>
    <Div cn="size-5/6 bg-black flex ">
        <Div cn='flex flex-col justify-center items-center h-full w-2/5'>
            <figure className='size-3/4'>
                <img src={rct} alt="Vite Logo" className='h-3/4 w-full'></img>
                <figcaption className='text-white text-center text-2xl'>Vite</figcaption>
            </figure>
            <p className='text-center text-teal-500'>Balance : <Span cn='text-xl bg-linear-to-r from-teal-500 via-teal-300 to-white bg-clip-text text-transparent'>555555555555555</Span></p>
        </Div>
        {option.options.option ? 
        <Div cn="flex flex-col h-full w-3/5 items-center justify-center gap-10">
            <Button cn="w-20 h-10 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={handleClick}>Withdraw</Button>
            <Button cn="w-20 h-10 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={handleClick}>Deposit</Button>
            <Button cn="w-20 h-10 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={handleClick}>Transfer</Button>
        </Div>
        :
        <Div cn="flex flex-col h-full w-3/5 items-center justify-center gap-10">
        </Div>
        }
    </Div>
    </>
}