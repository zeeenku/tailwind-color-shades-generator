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
import { Input } from "@/components/ui/input"
import {Trash2 as Trash2Icon, Terminal, CirclePlus} from "lucide-react";
import { addColor, changeColorNameId, changeColorShadeId, removeColor, StateType, updateColor } from '@/store'; 
import { useSelector, useDispatch } from 'react-redux';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { ChangeEvent, useEffect, useState } from "react";
import { shadeIds } from "@/types";
import { rgbToHex, hslToHex, isValidHex, cleanColorString, isValidHsl, isValidRgb } from "@/lib/color-formats";


type Color = {
    hexVal : string,
    name : string,
    id : number,
    role : string
}

export default function Sidebar() {

    /**
     * the main functionnality component
     */


    // global state components
    const dispatch = useDispatch();
    const colors = useSelector((state : StateType) => state.colors);


    // separate the color string values from the global state
    // make it more effecient for color detection of multiple formats, and in case of bad format
    type ColorStringInputs = { [key: string]: string };
    const [colorStringInputs, setColorStringInputs] = useState<ColorStringInputs>({});


    //initialise first random color here
    //to solve hydration error
    useEffect(()=>{
        dispatch(addColor());
    },[])

    const addNewColor = async () => {
        await dispatch(addColor());
    }


    const onRemoveColor = (role : string) => {  
        dispatch(removeColor(role));
    }


    // changes from color picker
    const onChangeColor = (event : ChangeEvent<HTMLInputElement> ,role : string) => {
        dispatch(updateColor(event.target.value, role));
    }


    const onChangeNameId = (event : ChangeEvent<HTMLInputElement> ,role : string) => {
        // validate nameId
        const newNameId = event.target.value.toLowerCase().replaceAll(" ", "-");
        if(newNameId.length > 15 || newNameId.length < 1) return;
        dispatch(changeColorNameId(newNameId, role));
    }


    const onChangeShadeId = (shadeId :number, role: string) => {
        if(!shadeIds.includes(shadeId)) return;
        dispatch(changeColorShadeId(shadeId, role));
    }


    

    const onChangeColorStringInput = (event : ChangeEvent<HTMLInputElement> ,role : string) => {

        /**
         * ? maybe make it as info somewhere
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

        // validate the color string
        const colorString = event.target.value;

        // update the color string inputs
        const newColorStringInputs = colors.reduce((acc : ColorStringInputs, el) => {
            if(role == el.role){
                acc[el.role] = colorString;
            }
            return acc;
        }, {});
        setColorStringInputs(newColorStringInputs);


        // if string is valid hex change state directly
        if(isValidHex(colorString)){
            dispatch(updateColor(colorString, role));
            return;
        }     


        // clean the input string and split into 3 parts (for hsl & rbg)
        const colorParts = cleanColorString(colorString);

        if (colorParts.length === 3 && isValidHsl(colorParts)) {
            const h = parseInt(colorParts[0].replace("°", ""));
            const s = parseInt(colorParts[1].replace("%", ""));
            const l = parseInt(colorParts[2].replace("%", ""));
            dispatch(updateColor( hslToHex(h, s, l), role));
            return;
        }

        else if (colorParts.length === 3 && isValidRgb(colorParts)) {
            const r = parseInt(colorParts[0]);
            const g = parseInt(colorParts[1]);
            const b = parseInt(colorParts[2]);
            dispatch(updateColor( rgbToHex(r, g, b), role));
            return;
        }

    };



    const reinitColorStrings = () => {
        const newColorStringInputs = colors.reduce((acc : ColorStringInputs , el) => {
            acc[el.role] = el.hexVal;
            return acc;
        }, {});
        setColorStringInputs(newColorStringInputs);
    };

    //whenver colors data changes from color picker reinit string inputs
    useEffect(()=>{
        reinitColorStrings();
    },[colors]);





return (
<aside className="bg-slate-50 h-full  w-[20rem]">
    <Card className="h-full max-h-full p-0 pb-14 overflow-y-auto rounded-none bg-slate-50">

        <CardHeader className="p-4">
            <CardTitle className="text-md">TailShadescn CSS Shades Generator</CardTitle>
            <CardDescription>The best shades generator, as beautiful as the Tailwind shades, for any color, with an integrated ShadCN theme generator.</CardDescription>
        </CardHeader>

    <CardContent className="p-0">

        { colors.map((el)=>(
            <div key={el.role} className="border-b border-slate-300 p-4 pb-5">

                <div className="flex justify-between items-center mb-1">
                    <h3 className="capitalize text-sm">{el.role}</h3>
                    {colors.length > 1 && <Button onClick={()=>onRemoveColor(el.role)} variant="outline" size="icon" className="rounded-full bg-slate-50 shadow-none border-none h-6 w-6">
                        <Trash2Icon className="h-3 w-3 text-slate-600"></Trash2Icon>
                    </Button>}
                </div>

                <Card>
                    <CardContent className="p-2">
                        <div className="flex justify-between items-center">

                            <div className="flex items-center justify-center w-[5.5rem] h-6">
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
                                className="w-full h-6 text-xs text-[0.75rem] md:text-[0.75rem] px-1 ms-1 focus:outline-none focus:outline-transparent focus:border-none border-none shadow-none"
                                />

                                
                            </div>
        
                            <div className="flex">

                                <div className="relative w-24 ">
                                    <Input type="text" placeholder="name" onChange={(ev)=>onChangeNameId(ev, el.role)} className="w-full bg-slate-100 border-none 
                                    shadow-none text-slate-700 font-medium text-[0.75rem] md:text-[0.75rem] text-center h-7 px-1"
                                    value={el.nameId}
                                    />
                                </div>

                                <span className="mx-1">-</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="text-[0.7rem] border-none shadow-none h-7 w-12 bg-slate-100 text-slate-700" >
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
            </div>))}


            <div className="p-4">
                <Button onClick={addNewColor} size="lg" className="w-full my-1">
                    <CirclePlus className="w-4 h-4 text-white" /> Add new color</Button>
            </div>
        </CardContent>

        <CardFooter className="p-4">
            <Alert className="mt-3 mb-1">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You can add components to your app using the cli.
                </AlertDescription>
            </Alert>
        </CardFooter>

        </Card>
    </aside>
);
}
