import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Color } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { exportCss, exportScss, exportTailwind3, exportTailwind4 } from "@/lib/export-data";
import { hexToHsl, hexToRgb } from "@/lib/color-formats";


type Props = {
    type: "all" | "one"; 
    data: Color[]; 
    children?: React.ReactNode;
};

const ExportDialog: React.FC<Props> = ({ type, data, children }) =>  {

    const colorFormats = ["hex", "rgb","hsl","oklch"]
    const exportOptions = ["tailwind 3", "tailwind 4", "css", "sass"]
    const [colorFormat, setColorFormat] = useState<string>(colorFormats[0]);
    const [codes, setCodes] = useState<{ [key: string]: string }>({});
    
        // Memoized export data so it doesn't re-calculate on every render
        const exportData = useMemo(() => {
        return data.map((el) => {
            const updatedShades = { ...el.allShades };
    
            // Convert all shades to the selected format
            Object.keys(updatedShades).forEach((shade: string) => {
            if (colorFormat === "rgb") {
                const [r,g,b] = hexToRgb(updatedShades[shade]);
                updatedShades[shade] = `rgb(${r},${g},${b})`;
            } else if (colorFormat === "hsl") {
                const [h,s,l] = hexToHsl(updatedShades[shade]);
                updatedShades[shade] = `hsl(${Math.round(h)},${Math.round(s)}%,${Math.round(l)}%)`;
            } 
            // else if (colorFormat === "oklch") {
            //     updatedShades[shade] = convertToOklch(updatedShades[shade]);
            // }
            // For "hex", no conversion is needed since it's the default format
            });
    
            return { ...el, allShades: updatedShades };
        });
        }, [colorFormat, data]);
    
        // Memoized export options to avoid recalculating on every render
        useEffect(() => {
        const result: { [key: string]: string } = {};
    
        exportOptions.forEach((option) => {
            switch (option) {
            case "tailwind 3":
                result[option] = exportTailwind3(exportData);
                break;
            case "tailwind 4":
                result[option] = exportTailwind4(exportData);
                break;
            case "css":
                result[option] = exportCss(exportData);
                break;
            case "sass":
                result[option] = exportScss(exportData);
                break;
            }
        });
    
        setCodes(result);
        }, [exportData]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="min-w-[35rem]">
                <DialogHeader>
                <DialogTitle>Export</DialogTitle>
                {/* <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription> */}
                </DialogHeader>
                <div className="flex justify-center">
                    <div className="w-full">
                        {/* <h3>Styles</h3> */}
  
                        
                        <Tabs defaultValue={exportOptions[0]}>
                            <div className="flex justify-between items-end">


                            <div className="flex space-x-2 py-2 items-start">
                                {colorFormats.map(el=>(
                                    <Button key={el} className={`text-xs h-5 px-2 uppercase`} 
                                    variant={el == colorFormat ?  "default" : "secondary"} 
                                        onClick={()=>setColorFormat(el)} size="sm">
                                        {el}
                                    </Button>
                                ))}
                            </div>

                            <TabsList className="rounded-b-none bg-slate-900 p-2">
                                {exportOptions.map((el)=> <TabsTrigger key={el} className="text-xs text-slate-100 capitalize" 
                                value={el}>{el}</TabsTrigger>)}
                
                            </TabsList>

                            </div>

                            <div className="relative w-full bg-slate-900 rounded-md text-slate-50">
                                <Button className="absolute right-6 top-3 h-6" variant="secondary" size="sm">copy</Button>

                                <pre className="text-md max-h-[50vh] rounded-md overflow-y-auto">
                                {exportOptions.map((el)=> 
                                    <TabsContent key={el} value={el} className="p-6 my-0 rounded-md rounded-tr-none">{codes[el]}</TabsContent>
                                )}
                                </pre>

                            </div>

                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ExportDialog;