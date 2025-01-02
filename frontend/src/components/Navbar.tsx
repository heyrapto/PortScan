import { Logo } from "../images";
import { HomeIcon, Link, Menu, PhoneCallIcon } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";

export const Navbar = () => {
    const [openNavigation, setOpenNavigation] =  useState(false);
    const toggleNavigation = () => {
        setOpenNavigation(!openNavigation);
    }
    return(
        <nav className="flex justify-between px-12 py-6 items-center z-50 w-full">
            <img src={Logo} alt="PortScan Logo"/>
            
            <ul className={`flex gap-10 ${openNavigation ? "flex flex-col bg-red-500 w-full" : "hidden"}`}>
                <div className="flex gap-1">
                <HomeIcon className="text-gray-400 w-[15px]" />
                <li><a href="" className="text-gray-500 text-[0.7rem]">Home</a></li>
                </div>
                <div className="flex gap-1">
                <Link className="text-gray-400 w-[15px]" />
                <li><a href="" className="text-gray-500 text-[0.7rem]">Paste links</a></li>
                </div>
                <div className="flex gap-1">
                <PhoneCallIcon className="text-gray-400 w-[15px]" />
                <li><a href="" className="text-gray-500 text-[0.7rem]">Contact us</a></li>
                </div>
            </ul>
            <div>
            <Button className="" tag={"Analyze"} />
            </div>
            <Menu className="w-[25px] text-gray-600 md:hidden flex cursor-pointer" onClick={toggleNavigation} />
        </nav>
    )
}