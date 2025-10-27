import { useRef, useState } from "react";
import {Div, Label, Button, Input} from "../Components/Assembler";

export default function Login(){
    const nameRef =  useRef<HTMLInputElement>(null);
    return<> <Div cn="h-30 bg-black w-30 flex flex-col items-center justify-start">
        <Label text="Name" cn="text-red" for="name"></Label>
        <Input cn="border-1" type="text" name="name" placeholder="Enter you name" ref={nameRef} ></Input>
    </Div></>
}