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


export default function Sidebar() {
    return (<aside className="bg-slate-50 h-full  w-[22rem]">
    <Card className="h-full max-h-full p-0 pb-14 overflow-y-auto rounded-none bg-slate-50">
    <CardHeader className="p-4">
        <CardTitle>TailShadescn CSS Shades Generator</CardTitle>
        <CardDescription>The best shades generator beautiful like tailwind shades generator for any color, with a shadcn theme genertor integrated</CardDescription>
        <Button className="w-full">hello there</Button>

    </CardHeader>
    <CardContent className="p-0">


        {/* <div className="mt-5 flex justify-between">
            <span>Shadcn Theme</span>
            <Switch></Switch>
        </div> */}




<div className="border-b border-slate-300 pt-3 pb-4 px-4">
    <div className="flex justify-between items-center mb-2">
        <h3>Primary</h3>

        <Button variant="outline" size="icon" className="rounded-full bg-slate-50 shadow-none border-none h-7 w-7 p-1">
            <XIcon className="h-6 w-6"></XIcon>
        </Button>
    </div>
    <Card >
            <CardContent className="p-3">
                <div className="flex justify-between items-center">
            

                <div className="flex items-start justify-center w-[6.25rem] h-7">
                        <input type="color" id="color" name="color" className="hidden" />
                        <label htmlFor="color" className="inline-block aspect-square me-1 my-1 h-5 rounded-full bg-slate-900"></label>
                        <Input type="text" placeholder="color" className="w-full h-7 text-xs px-1 ms-1
                        focus:outline-none focus:outline-transparent focus:border-none border-none shadow-none" />
                    </div>

                    <div className="flex">
                    <div className="relative w-16 ">
                    <Input type="text" placeholder="name" className="w-full bg-slate-100 border-none 
                    shadow-none text-slate-700 text-xs text-center h-7 px-1" />
                    </div>
                    <span className="mx-1">-</span>


                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-xs border-none shadow-none h-7 w-16 bg-slate-100 text-slate-700" >500</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                    </div>
                </div>

            </CardContent>

        </Card>

        </div>



        <div className="border-b border-slate-300 pt-3 pb-4 px-4">
    <div className="flex justify-between items-center mb-2">
        <h3>Primary</h3>

        <Button variant="outline" size="icon" className="rounded-full bg-slate-50 shadow-none border-none h-7 w-7 p-1">
            <XIcon className="h-6 w-6"></XIcon>
        </Button>
    </div>
    <Card >
            <CardContent className="p-3">
                <div className="flex justify-between items-center">
            

                <div className="flex items-start justify-center w-[6.25rem] h-7">
                        <input type="color" id="color" name="color" className="hidden" />
                        <label htmlFor="color" className="inline-block aspect-square me-1 my-1 h-5 rounded-full bg-slate-900"></label>
                        <Input type="text" placeholder="color" className="w-full h-7 text-xs px-1 ms-1
                        focus:outline-none focus:outline-transparent focus:border-none border-none shadow-none" />
                    </div>

                    <div className="flex">
                    <div className="relative w-16 ">
                    <Input type="text" placeholder="name" className="w-full bg-slate-100 border-none 
                    shadow-none text-slate-700 text-xs text-center h-7 px-1" />
                    </div>
                    <span className="mx-1">-</span>


                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-xs border-none shadow-none h-7 w-16 bg-slate-100 text-slate-700" >500</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                    </div>
                </div>

            </CardContent>

        </Card>

        </div>




        <div className="border-b border-slate-300 pt-3 pb-4 px-4">
    <div className="flex justify-between items-center mb-2">
        <h3>Primary</h3>

        <Button variant="outline" size="icon" className="rounded-full bg-slate-50 shadow-none border-none h-7 w-7 p-1">
            <XIcon className="h-6 w-6"></XIcon>
        </Button>
    </div>
    <Card >
            <CardContent className="p-3">
                <div className="flex justify-between items-center">
            

                <div className="flex items-start justify-center w-[6.25rem] h-7">
                        <input type="color" id="color" name="color" className="hidden" />
                        <label htmlFor="color" className="inline-block aspect-square me-1 my-1 h-5 rounded-full bg-slate-900"></label>
                        <Input type="text" placeholder="color" className="w-full h-7 text-xs px-1 ms-1
                        focus:outline-none focus:outline-transparent focus:border-none border-none shadow-none" />
                    </div>

                    <div className="flex">
                    <div className="relative w-16 ">
                    <Input type="text" placeholder="name" className="w-full bg-slate-100 border-none 
                    shadow-none text-slate-700 text-xs text-center h-7 px-1" />
                    </div>
                    <span className="mx-1">-</span>


                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-xs border-none shadow-none h-7 w-16 bg-slate-100 text-slate-700" >500</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                    </div>
                </div>

            </CardContent>

        </Card>

        </div>

            <div className="p-4">
                <Button className="w-full my-2">Add new color</Button>
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