import {Div, Button, Span, Input, Label} from '../Components/Assembler'
import rct from '../../public/vite.svg';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AccountContext } from '../App';

interface optionDisplay{
    transfer : boolean,
    deposit : boolean,
    withdraw : boolean
}
interface DashboardProps{
    options : {option : boolean, optionDisplay : optionDisplay},
}
export default function Dashboard(){
    const [option, setOption] = useState<DashboardProps>({options :{option : true, optionDisplay : {transfer : false, deposit : false, withdraw : false}}});
    const [balance, setBalance] = useState<number>(0);
    const depositRef = useRef<HTMLInputElement>(null);
    const transferRef = useRef<HTMLInputElement>(null);
    const withdrawRef = useRef<HTMLInputElement>(null);
    const account = useContext(AccountContext);
    useEffect(()=>{
        async function fetchBalance(){
            const data = await fetch('http://localhost:3000/balance', {
                headers : {
                    'Content-Type' : 'application/json'
                },
                method : 'POST',
                body : JSON.stringify({account})
            });
            const res = await data.json();
            res.forEach((item : {balance : number})=>{
                setBalance(item.balance);
            })
        }
        fetchBalance();
    }, [option.options]);
    const handleClick = (val : string)=>{
        console.log(val);
        switch(val){
            case 'withdraw':
                setOption(prev =>{
            return {...prev, options : {option : false, optionDisplay : {...prev.options.optionDisplay, withdraw : true}}};
            });
            break;

            case 'deposit' : 
            setOption(prev =>{
            return {...prev, options : {option : false, optionDisplay : {...prev.options.optionDisplay, deposit : true}}};
            });
            break;

            case 'transfer' : 
            setOption(prev =>{
            return {...prev, options : {option : false, optionDisplay : {...prev.options.optionDisplay, transfer : true}}};
            });
            break;
        }
        console.log("Button Clicked");
    }

    const handleDeposit = async()=>{
        setOption(prev =>{
            return {...prev, options : {option : true, optionDisplay : {...prev.options.optionDisplay, deposit : false}}};
        })
        if(depositRef.current && depositRef.current.value){
            const data = await fetch('http://localhost:3000/deposit', {
                headers:{
                    'Content-Type' : 'application/json'
                },
                method : 'POST',
                body : JSON.stringify({
                    amount : depositRef.current.value ? depositRef.current.value : 0,
                    account : account
                })
            });
            if(data.ok){
                console.log("Deposit Successful");
            }
        }
    }

    async function handleTransfer(){
        console.log(account);
        const data = await fetch('http://localhost:3000/transfer', {
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
                to : transferRef.current!.value,
                from : account,
                amount : depositRef.current!.value
            })
        });

        if(data.ok){
            console.log("Transfer Successful");
            setOption(prev =>{
            return {...prev, options : {option : true, optionDisplay : {...prev.options.optionDisplay, transfer : false}}};
        });
        }
        else{
            prompt("Transfer Failed!! Enter a valid account");
        }
    }

    async function handleWithdraw(){
        const data = await fetch('http://localhost:3000/withdraw', {
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
                account : account,
                amount : withdrawRef.current?.value
            })
        });
        if(data.ok){
            console.log("Withdrawal Successful");
            setOption(prev =>{
            return {...prev, options : {option : true, optionDisplay : {...prev.options.optionDisplay, withdraw : false}}};
        });
        }
        else{
            alert("Withdrawal Failed!! Insufficient Balance");
        }
    }
    return <>
    <Div cn="size-5/6 bg-black flex ">
        <Div cn='flex flex-col justify-center items-center h-full w-2/5'>
            <figure className='size-3/4'>
                <img src={rct} alt="Vite Logo" className='h-3/4 w-full'></img>
                <figcaption className='text-white text-center text-2xl'>{account}</figcaption>
            </figure>
            <p className='text-center text-teal-500'>Balance : <Span cn='text-xl bg-linear-to-r from-teal-500 via-teal-300 to-white bg-clip-text text-transparent'>{balance}</Span></p>
        </Div>
        {option.options.option ? 
        <Div cn="flex flex-col h-full w-3/5 items-center justify-center gap-10">
            <Button cn="w-20 h-10 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={()=> handleClick('withdraw')}>Withdraw</Button>
            <Button cn="w-20 h-10 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={()=> handleClick('deposit')}>Deposit</Button>
            <Button cn="w-20 h-10 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={()=> handleClick('transfer')}>Transfer</Button>
        </Div>
        :
        <Div cn="flex flex-col h-full w-3/5 items-center justify-center gap-10">
            {option.options.optionDisplay.deposit 
            &&
            <Div cn='w-full border h-2/3 border-red-500 flex flex-col justify-center items-center'>
                <Label for='deposit' cn='text-xl text-teal-500 self-start ml-10 my-4' text='Deposit'></Label>
                <Input placeholder='Enter deposit amount...' ref={depositRef} cn='text-cyan-500 p-2 accent-red-600 mb-6 text-xl' type='number' name='deposit'></Input>
                <Button cn="w-20 h-10 mb-4 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={handleDeposit}>Deposit</Button>
            </Div>
            }
            {option.options.optionDisplay.transfer 
            &&
            <Div cn='w-full h-2/3 flex flex-col justify-center items-center'>
                <Label for='transfer' cn='text-xl text-teal-500 self-start ml-10 my-2' text='Transfer To'></Label>
                <Input placeholder="Receiver's name..." ref={transferRef} cn='text-cyan-500 p-2 accent-red-600 mb-4 text-xl' type='text' name='transfer'></Input>
                <Label for='deposit' cn='text-xl text-teal-500 self-start ml-10 my-2' text='Deposit'></Label>
                <Input placeholder='Enter deposit amount...' ref={depositRef} cn='text-cyan-500 p-2 accent-red-600 mb-2 text-xl' type='number' name='deposit'></Input>
                <Button cn="w-20 h-10 mt-3 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={handleTransfer}>Transfer</Button>
            </Div>
            }
            {option.options.optionDisplay.withdraw 
            &&
            <Div cn='w-full border h-2/3 border-red-500 flex flex-col justify-center items-center'>
                <Label for='withdraw' cn='text-xl text-teal-500 self-start ml-10 my-4' text='Withdraw'></Label>
                <Input placeholder='Enter withdrawal amount...' ref={withdrawRef} cn='text-cyan-500 p-2 accent-red-600 mb-6 text-xl' type='number' name='withdraw'></Input>
                <Button cn="w-20 h-10 mb-4 rounded-md bg-white cursor-pointer hover:bg-teal-500 hover:text-white" onClick={handleWithdraw}>Withdraw</Button>
            </Div>
            }
        </Div>
        }
    </Div>
    </>
}