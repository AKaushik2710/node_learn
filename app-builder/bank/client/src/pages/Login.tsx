import { useRef, useState, useContext } from "react";
import {Div, Label, Button, Input, Span} from "../Components/Assembler";
import { AuthContext } from "../App";
interface LoginProps{
    cn : string[],
    active : boolean
}

export default function Login(){
    const nameRef =  useRef<HTMLInputElement>(null);
    const balanceRef = useRef<HTMLInputElement>(null);
    const myContext = useContext(AuthContext); 
    const {setLogin, setAccount} = myContext!;
    const [flag, setFlag] = useState<boolean>(false);
    const [log, setLog] = useState<LoginProps>({cn: ["w-35 border hover:text-black hover:bg-white rounded-tl-2xl py-2 border-white focus:bg-teal-500 ", "hover:text-black hover:bg-white w-35 border border-white py-2 rounded-tr-2xl focus:bg-teal-500 "], active: true});

    function handleLog(val : boolean){
        setLog(()=>{
            return {...log, active : val};
        })
    }
    async function handleDashBoardLogin(){
        const name = nameRef.current!.value;
        console.log(name);
        try{
            const data = await fetch("http://localhost:3000/login", {
                headers : {"Content-Type" : "application/json"},
                method : "POST",
                body : JSON.stringify({name})
            })
            if(data.ok){
                setLogin!(false);
                setAccount!(name);
                // data.json().then((res)=> console.log(res.error));
            }
            else{
                setFlag(true);
                console.log("Login Failed");
            }
        }
        catch(err){
            console.error(err);
        }
    }

    async function handleDashBoardRegistration() {
        const name = nameRef.current?.value;
        const balance = balanceRef.current?.value;

        try{
            const data = await fetch("http://localhost:3000/register", {
                headers : {"Content-Type" : "application/json"},
                method : "POST",
                body : JSON.stringify({
                    name : name,
                    balance : balance
                })
            })

            if(data.ok){
                setLogin!(false);
                setAccount!(name!);
            }
            // console.log(res.then());
        }
        catch(err){
            console.error(err);
        }
    }
    return<>
        <Div cn="flex flex-col size-70 bg-black text-white rounded-2xl">
        <Div cn="flex flex-row w-full">
            <Button cn={!log.active ? log.cn[0].split("focus:")[0] : log.cn[0].concat("bg-teal-500")} onClick={()=> handleLog(true)}>Login</Button>
            <Button cn={log.active ? log.cn[1].split("focus:")[0] : log.cn[1].concat("bg-teal-500")} onClick={()=> handleLog(false)}>Register</Button>
        </Div>
        <Div cn="flex flex-col h-100 items-center">
            {log.active ? <>
            <Label text="Name" cn="mt-6 my-2 self-start ml-12 border-red-400" for="name"></Label>
            <Input cn="p-2 text-teal-500 accent-color-teal-500 mb-8" type="text" name="name" placeholder="Enter you name" ref={nameRef} ></Input>
            <Button onClick={handleDashBoardLogin} cn="border-1 border-teal-500 w-20 hover:bg-teal-500 rounded-md py-2">Login</Button>
            {flag && <Span cn="text-red-900">User doesn't exist</Span>}
            </> : <>
            <Label text="Name" cn="my-2 self-start ml-12 border-red-400" for="name"></Label>
            <Input cn="p-2 text-teal-500 accent-color-teal-500 mb-2" type="text" name="name" placeholder="Enter you name" ref={nameRef} ></Input>
            <Label text="Balance" cn="mb-2 self-start ml-12 border-red-400" for="balance"></Label>
            <Input cn="p-2 text-teal-500 accent-color-teal-500 mb-3" type="number" name="balance" 
            placeholder="Enter your money" ref={balanceRef} ></Input>
            <Button onClick={handleDashBoardRegistration} cn="border-1 border-teal-500 w-20 hover:bg-teal-500 rounded-md py-2">Register</Button>
            </>}
        </Div>
    </Div></>
}