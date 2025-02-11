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
import {X as XIcon, Pen as PenIcon, Pipette as PipetteIcon} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Sidebar() {
    return (<aside className="bg-slate-50 h-full  w-[22rem]">
    <Card className="h-full max-h-full pb-14 overflow-y-auto rounded-none bg-slate-50">
    <CardHeader>
        <CardTitle>TailShadescn CSS Shades Generator</CardTitle>
        <CardDescription>The best shades generator beautiful like tailwind shades generator for any color, with a shadcn theme genertor integrated</CardDescription>
        <Button className="w-full">hello there</Button>

    </CardHeader>
    <CardContent>


        {/* <div className="mt-5 flex justify-between">
            <span>Shadcn Theme</span>
            <Switch></Switch>
        </div> */}


        <div className="my-3">
        <h3 className="mb-1">Primary</h3>

        <Card>
            <CardContent className="p-3">
                <div className="flex justify-between items-center">

                <div className="flex border items-start justify-center w-[6.25rem] shadow rounded-sm h-7">
                        <input type="color" id="color" name="color" className="hidden" />
                        <label htmlFor="color" className="inline-block aspect-square m-1 h-5 rounded-full bg-slate-900"></label>
                        <Input type="text" placeholder="color" className="w-full h-7 text-xs px-1
                        focus:outline-none focus:outline-transparent focus:border-none border-none shadow-none" />
                    </div>

                    <Button variant="outline" size="icon" className="rounded-full h-7 w-7 p-1">
                        <XIcon className="h-6 w-6"></XIcon>
                        </Button>
                </div>
                <div className="flex justify-center  mt-3">
 

                    <div className="flex">
                    <div className="relative w-20 ">
                    <Input type="text" placeholder="name" className="w-full text-center h-7 px-1" />
                    </div>
                    <span className="mx-1">-</span>


                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-sm h-7 w-20 text-slate-700" >500</Button>
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








        <div className="my-3">
        <h3>Secondary</h3>
        <Card>
            <CardContent className="p-3">
                <div className="flex justify-between items-center">
                    <div className="relative w-24 ">
                    <Input type="text" placeholder="name" className="w-full h-7 pe-7" />
                    <PenIcon className="absolute top-2 h-3 right-1 text-slate-500 fill-slate-500 border-slate-500"/>
                    </div>
                    <Button variant="outline" size="icon" className="rounded-full h-7 w-7 p-1">
                        <XIcon className="h-6 w-6"></XIcon>
                        </Button>
                </div>
                <div className="flex justify-between mt-3">
                    <div className="flex">
                <input type="color" id="color" name="color" />
                <div className="relative w-24 ms-2">
                    <Input type="text" placeholder="color" className="w-full h-7 pe-7" />
                    <PipetteIcon className="absolute top-2 h-3 right-1 text-slate-500 fill-slate-500"/>
                    </div>                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-sm h-7 text-slate-700" >500</Button>
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
            </CardContent>

        </Card>
        </div>




        <div className="my-3">
        <h3>Teritiary</h3>
        <Card>
            <CardContent className="p-3">
                <div className="flex justify-between items-center">
                    <div className="relative w-24 ">
                    <Input type="text" placeholder="name" className="w-full h-7 pe-7" />
                    <PenIcon className="absolute top-2 h-3 right-1 text-slate-500 fill-slate-500 border-slate-500"/>
                    </div>
                    <Button variant="outline" size="icon" className="rounded-full h-7 w-7 p-1">
                        <XIcon className="h-6 w-6"></XIcon>
                        </Button>
                </div>
                <div className="flex justify-between mt-3">
                    <div className="flex">
                <input type="color" id="color" name="color" />
                <div className="relative w-24 ms-2">
                    <Input type="text" placeholder="color" className="w-full h-7 pe-7" />
                    <PipetteIcon className="absolute top-2 h-3 right-1 text-slate-500 fill-slate-500"/>
                    </div>                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-sm h-7 text-slate-700" >500</Button>
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
            </CardContent>

        </Card>
        </div>


    </CardContent>
    <CardFooter>
        <p>App made by zeenku</p>
    </CardFooter>

    </Card>
    </aside>);
}