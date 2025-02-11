"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Input } from "@/components/ui/input"
import {X as XIcon, Pen as PenIcon, Pipette as PipetteIcon, Terminal} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { useState } from "react";


type Color = {
    hexVal : string,
    name : string,
    id : number,
    role : string
}

export default function Sidebar() {
    const cs : Color[] = [
        {
            hexVal : "#84cc16",
            name : "lime",
            id : 500,
            role : "primary"
        },
        {
            hexVal : "#4f46e5",
            name : "indigo",
            id : 600,
            role : "secondary"
        },


        {
            hexVal : "#f472b6",
            name : "pink",
            id : 400,
            role : "tertiary"
        },

    ];
    const [colors, setColors] = useState(cs);

    const removeColor = (el : Color) => {

    }

    const addColor = () => {

    }

    const onChangeColor = () => {

    }

    const onPasteColor = () => {

    }

    const onChangeName = () => {
        
    }

    const onChangeId = () => {

    }

    return (<aside className="bg-slate-50 h-full  w-[22rem]">
    <Card className="h-full max-h-full p-0 pb-14 overflow-y-auto rounded-none bg-slate-50">
    <CardHeader className="p-4">
        <CardTitle>TailShadescn CSS Shades Generator</CardTitle>
        <CardDescription>The best shades generator, as beautiful as the Tailwind shades, for any color, with an integrated ShadCN theme generator.</CardDescription>
        <Button className="w-full">hello there</Button>

    </CardHeader>
    <CardContent className="p-0">





{colors.map((el)=>{
    return (<div key={el.role} className="border-b border-slate-300 p-4 pb-5">
        <div className="flex justify-between items-center mb-1">
            <h3 className="capitalize text-sm">{el.role}</h3>
    
            <Button onClick={()=>removeColor(el)} variant="outline" size="icon" className="rounded-full bg-slate-50 shadow-none border-none h-6 w-6">
                <XIcon className="h-3 w-3"></XIcon>
            </Button>
        </div>
        <Card >
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                
    
                    <div className="flex items-center justify-center w-28 h-6">
                            <input type="color" id="color" name="color" className="w-0 h-0" 
                            value={el.hexVal} onChange={onChangeColor}
                            />
                            <label 
                            htmlFor="color" 
                            className="inline-block cursor-pointer aspect-square me-1 my-1 h-5 rounded-full"
                            style={{ backgroundColor: el.hexVal }}
                            ></label>

                        
                            <Input type="text" 
                            value={el.hexVal} onChange={onPasteColor}
                            placeholder="color" className="w-full h-6 text-xs px-1 ms-1
                            focus:outline-none focus:outline-transparent focus:border-none border-none shadow-none" />
                        </div>
    
                        <div className="flex">
                        <div className="relative w-16 ">
                        <Input type="text" placeholder="name" onChange={onChangeName} className="w-full bg-slate-100 border-none 
                        shadow-none text-slate-700 font-medium text-[0.8rem] md:text-[0.8rem] text-center h-7 px-1"
                        value={el.name}
                        />
                        </div>
                        <span className="mx-1">-</span>
    
    
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="text-xs border-none shadow-none h-7 w-16 bg-slate-100 text-slate-700" >
                                {el.id}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onChangeId}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={onChangeId}>Billing</DropdownMenuItem>
                            <DropdownMenuItem onClick={onChangeId}>Team</DropdownMenuItem>
                            <DropdownMenuItem onClick={onChangeId}>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                        </div>
                    </div>
    
                </CardContent>
    
            </Card>
    
            </div>);
})}




            <div className="p-4">
                <Button onClick={addColor} className="w-full my-2">Add new color</Button>
            </div>
    </CardContent>
    <CardFooter className="p-4">
        <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the cli.
            </AlertDescription>
        </Alert>
    </CardFooter>

    </Card>
    </aside>);
}