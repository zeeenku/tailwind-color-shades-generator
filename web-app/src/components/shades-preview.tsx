import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { StateType } from "@/store";

export default function ShadesPreview() {

    const colors = useSelector((state : StateType) => state.colors);

    return (<div className="min-h-screen bg-slate-300 w-full">
        <Card className="rounded-none min-h-screen">

        <CardContent className="px-4">



        {colors.map((color) => (
            <div key={color.role} className="my-4 2xl:contents">
            <div className="flex justify-between items-end">
                <div className="capitalize text-sm font-semibold text-slate-900 dark:text-slate-200 2xl:col-end-1 2xl:pt-2.5">
                    {color.name}
                </div>

                <div className="flex items-center space-x-3 justify-end">
                <Button variant="outline" className="border-none shadow-none p-0 text-xs text-slate-600 h-4 hover:bg-white ">share</Button>
                <Button variant="outline" className="border-none shadow-none p-0 text-xs text-slate-600 h-4 hover:bg-white ">export</Button>
            </div>
                </div>
            <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-3 gap-x-2 sm:mt-2 2xl:mt-0">
                <div className="relative flex">
                    <div className="flex items-center gap-x-3 w-full cursor-pointer sm:block sm:space-y-1.5">
                        <div className="h-10 w-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full" style={{backgroundColor:"#000000"}}>
                        </div>
                        <div className="px-0.5">
                            <div className="w-6 font-medium text-xs text-slate-900 2xl:w-full dark:text-white">
                                50
                            </div>
                            <div className="text-slate-500 text-xs font-mono lowercase dark:text-slate-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs">
                                #eef2ff
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))
        }
        
        </CardContent>
        {/* <CardFooter>
            <p>Card Footer</p>
        </CardFooter> */}

<CardFooter className="px-4 justify-between items-end">
<div className="flex flex-col justify-end">
            <CardTitle className="text-[0.8rem] px-0.5 w-fit bg-slate-100">9,235,765</CardTitle>
            <CardDescription className="w-32 text-xs">shades generated</CardDescription>

        </div>
    
<div className="flex space-x-2 items-end w-full justify-end">
                <Button size="sm">UI Examples</Button>
                <Button size="sm">Share all</Button>
                <Button size="sm">Export all</Button>

</div>




        </CardFooter>
        </Card>
    </div>);
}