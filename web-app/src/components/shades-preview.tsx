import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { StateType } from "@/store";
import { useToast } from "@/hooks/use-toast"
import { exportCss, exportScss, exportTailwind3 } from "@/lib/export-data";
import { useEffect, useState } from "react";
import ExportDialog from "./export-dialog";

export default function ShadesPreview() {

    
    const colors = useSelector((state : StateType) => state.colors);
    const [shadesGeneratedCounter, setShadesGeneratedCounter] = useState("0");
    const { toast } = useToast()

    useEffect(()=>{
        //todo: add http req to get ounter from backend
        const res = (9845766).toString().split("").reverse().join("").match(/.{1,3}/g)!.reverse().join(",");
        setShadesGeneratedCounter(res);
    },[])


    const notify = (title:string, description:string) => {
        toast({title,description})
    }

    const copyColor = (name:string, hex:string, shadeId:string) => {
        navigator.clipboard.writeText(hex)
        notify("color copied successfully", `${name} ${shadeId} ${hex}`)
    }

return (
<div className="min-h-screen bg-slate-300 w-full">
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
                        <ExportDialog type="one" data={[color]} >
                            <Button variant="outline" 
                            className="border-none shadow-none p-0 text-xs text-slate-600 h-4 hover:bg-white ">
                                export
                            </Button>
                        </ExportDialog>
                        
                    </div>

                </div>

                <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-3 gap-x-2 sm:mt-2 2xl:mt-0">

                    {Object.keys(color.allShades).map((shadeId)=>(
                        <div className="relative flex" key={color+shadeId}>
                            <button onClick={()=>copyColor(color.name ,color.allShades[shadeId],shadeId )} className="flex items-center gap-x-3 w-full cursor-pointer sm:block sm:space-y-1.5">

                                <div className="h-10 w-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full" 
                                    style={{backgroundColor:color.allShades[shadeId]}}>
                                        <span className="w-full h-full opacity-0 hover:opacity-100 flex justify-center items-center text-[0.7rem]"
                                        style={{color: color.allShades[(parseInt(shadeId) < 500 ? 950 : 50 ).toString()]}}
                                        >copy</span>
                                </div>

                                <div className="px-0.5">
                                    <div className="w-6 font-medium text-xs text-slate-900 2xl:w-full dark:text-white">
                                        {shadeId}
                                    </div>
                                    <div className="text-slate-500 text-xs font-mono lowercase dark:text-slate-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs">
                                        {color.allShades[shadeId]}
                                    </div>
                                </div>

                            </button>
                        </div>
                    ))} 

                </div>
            </div>
            ))
            }
        </CardContent>

        <CardFooter className="px-4 justify-between items-end">

            <div className="flex flex-col justify-end">
                <CardTitle className="text-[0.8rem] px-0.5 w-fit bg-slate-100">{shadesGeneratedCounter}</CardTitle>
                <CardDescription className="w-32 text-xs">shades generated</CardDescription>
            </div>
            
            <div className="flex space-x-2 items-end w-full justify-end">
                <Button size="sm">UI Examples</Button>
                <Button size="sm">Share all</Button>
                <ExportDialog type="all" data={colors} >
                    <Button size="sm">Export all</Button>
                </ExportDialog>
            </div>

        </CardFooter>
    </Card>
</div>
);
}