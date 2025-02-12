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
import {Trash2 as Trash2Icon, Terminal} from "lucide-react";
import { addColor, changeColorName, changeColorShadeId, removeColor, StateType, updateColor } from '@/store'; 
import { useSelector, useDispatch } from 'react-redux';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { shadeIds } from "@/types";
import { rgbToHex, hslToHex, isValidHex, cleanColorString, isValidHsl, isValidRgb } from "@/utils";


type Color = {
    hexVal : string,
    name : string,
    id : number,
    role : string
}

export default function Sidebar() {

    const dispatch = useDispatch();


    const colors = useSelector((state : StateType) => state.colors);

    const csi : { [key:string]: string} = {}; 
    const [colorStringInputs, setColorStringInputs] = useState(csi)

    
    const reinitColorStrings = () => {
        const newColorStringInputs = colors.reduce((acc, el) => {
            acc[el.role] = el.hexVal;
            return acc;
        }, {});
        setColorStringInputs(newColorStringInputs);
    };

    //for first initial random primary color
    useEffect(()=>{
        dispatch(addColor());
    },[])

    useEffect(()=>{
        reinitColorStrings();
    },[colors])
    


    const onRemoveColor = (role : string) => {  
        dispatch(removeColor(role));
        // hex colors data changes
    }

    const addNewColor = async () => {
        await dispatch(addColor());
        // hex colors data changes
    }

    const onChangeColor = (event : ChangeEvent<HTMLInputElement> ,role : string) => {
        dispatch(updateColor(event.target.value, role));
        // hex colors data changes
    }




    const onChangeColorStringInput = (event : ChangeEvent<HTMLInputElement> ,role : string) => {

        /**
         * detectable cases
         * has a #
         * rgb:
         * 
         * 171, 118, 115
         * rgb(255, 0, 0)
         * hsl:
         * hsl(0, 100%, 50%)
         * 0 62% 55%
         * 4°, 25%, 56%
         * 4, 25%, 56%
         */
        const colorString = event.target.value;
        if(colorString.length < 1) return;

        const newColorStringInputs = colors.reduce((acc, el) => {
            if(role == el.role){
                acc[el.role] = colorString;
            }
            return acc;
        }, {});
        setColorStringInputs(newColorStringInputs);

        if(isValidHex(colorString)){
            dispatch(updateColor(colorString, role));
            return;
        }     



        // Clean the input string and split into parts
        const colorParts = cleanColorString(colorString);

        console.log(colorParts)


        // Handle HSL format: 'h,s,l' or 'hsl(h, s%, l%)'
        if (colorParts.length === 3 && isValidHsl(colorParts)) {
            console.log("ggg")
            const h = parseInt(colorParts[0].replace("°", ""));
            const s = parseInt(colorParts[1].replace("%", ""));
            const l = parseInt(colorParts[2].replace("%", ""));
            dispatch(updateColor( hslToHex(h, s, l), role));
        }
        // Handle RGB format: 'r,g,b' or 'rgb(r, g, b)'
        else if (colorParts.length === 3 && isValidRgb(colorParts)) {
            const r = parseInt(colorParts[0]);
            const g = parseInt(colorParts[1]);
            const b = parseInt(colorParts[2]);
            dispatch(updateColor( rgbToHex(r, g, b), role));

        }





    };


    

    const onChangeName = (event : ChangeEvent<HTMLInputElement> ,role : string) => {
        const newName = event.target.value.toLowerCase().replaceAll(" ", "-");
        if(newName.length > 10 || newName.length < 1) return;
        dispatch(changeColorName(newName, role));
    }


    const onChangeShadeId = (shadeId :number, role: string) => {
        if(!shadeIds.includes(shadeId)) return;
        dispatch(changeColorShadeId(shadeId, role));
    }

    return (<aside className="bg-slate-50 h-full  w-[22rem]">
    <Card className="h-full max-h-full p-0 pb-14 overflow-y-auto rounded-none bg-slate-50">
    <CardHeader className="p-4">
        <CardTitle>TailShadescn CSS Shades Generator</CardTitle>
        <CardDescription>The best shades generator, as beautiful as the Tailwind shades, for any color, with an integrated ShadCN theme generator.</CardDescription>
        {/* <Button className="w-full">hello there</Button> */}

    </CardHeader>
    <CardContent className="p-0">





{colors.map((el)=>{
    return (<div key={el.role} className="border-b border-slate-300 p-4 pb-5">
        <div className="flex justify-between items-center mb-1">
            <h3 className="capitalize text-sm">{el.role}</h3>
    

            {colors.length > 1 && <Button onClick={()=>onRemoveColor(el.role)} variant="outline" size="icon" className="rounded-full bg-slate-50 shadow-none border-none h-6 w-6">
                <Trash2Icon className="h-3 w-3 text-slate-600"></Trash2Icon>
            </Button>}
        </div>
        <Card >
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                
    
                    <div className="flex items-center justify-center w-28 h-6">
                            <input type="color" id={el.role} name="color" className="w-0 h-0" 
                            value={el.hexVal} onChange={(val) => onChangeColor(val, el.role)}
                            />
                            <label 
                            htmlFor={el.role} 
                            className="inline-block border cursor-pointer aspect-square me-1 my-1 h-5 rounded-full"
                            style={{ backgroundColor: el.hexVal }}
                            ></label>

                        
                            <Input
                            type="text"
                            onBlur={reinitColorStrings}
                            value={colorStringInputs[el.role] || ""}
                            onChange={(ev) => onChangeColorStringInput(ev, el.role)}
                            placeholder="color"
                            className="w-full h-6 text-xs px-1 ms-1 focus:outline-none focus:outline-transparent focus:border-none border-none shadow-none"
                            />

                        
                        </div>
    
                        <div className="flex">
                        <div className="relative w-24 ">
                        <Input type="text" placeholder="name" onChange={(ev)=>onChangeName(ev, el.role)} className="w-full bg-slate-100 border-none 
                        shadow-none text-slate-700 font-medium text-[0.8rem] md:text-[0.8rem] text-center h-7 px-1"
                        value={el.name}
                        />

                        
                        </div>
                        <span className="mx-1">-</span>
    
    
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="text-xs border-none shadow-none h-7 w-12 bg-slate-100 text-slate-700" >
                                {el.shadeId}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex py-2 flex-wrap gap-0.5 justify-center w-36">
                            {shadeIds.map(id=>(<DropdownMenuItem className={`${id == el.shadeId ? "bg-slate-200" : "" } w-10 block text-center text-xs cursor-pointer`} key={el.role+id} onClick={()=>onChangeShadeId(id, el.role)}>{id}</DropdownMenuItem>))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                        </div>
                    </div>
    
                </CardContent>
    
            </Card>
    
            </div>);
})}




            <div className="p-4">
                <Button onClick={addNewColor} className="w-full my-2">Add new color</Button>
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
