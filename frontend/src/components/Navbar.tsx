import { Logo } from "../images";
import { HomeIcon, Link, Menu, PhoneCallIcon } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";

export const Navbar = () => {
    const [openNavigation, setOpenNavigation] =  useState(false);
    const toggleNavigation = () => {
        setOpenNavigation(!openNavigation);
    }

    return (
        <nav className="flex justify-between px-12 py-6 items-center z-50 w-full">
            <img src={Logo} alt="PortScan Logo" />

            {/* Navigation Links (Visible on large screens, hidden on small screens) */}
            <div 
                className={`${
                    openNavigation ? "flex flex-col bg-red-500" : "hidden"
                } md:flex md:flex-row md:gap-10 transition-all duration-300 ease-in-out transform md:static absolute top-0 left-0 w-full md:w-auto`}>
                <ul className="flex gap-10">
                    <div className="flex gap-1">
                        <HomeIcon className="text-gray-400 w-[15px]" />
                        <li><a href="#" className="text-gray-500 text-[0.7rem]">Home</a></li>
                    </div>
                    <div className="flex gap-1">
                        <Link className="text-gray-400 w-[15px]" />
                        <li><a href="#" className="text-gray-500 text-[0.7rem]">Paste links</a></li>
                    </div>
                    <div className="flex gap-1">
                        <PhoneCallIcon className="text-gray-400 w-[15px]" />
                        <li><a href="#" className="text-gray-500 text-[0.7rem]">Contact us</a></li>
                    </div>
                </ul>
                <Button className="" tag={"Analyze"} />
            </div>

            {/* Mobile Menu Icon (Visible only on small screens) */}
            <Menu 
                className="w-[25px] text-gray-600 md:hidden flex cursor-pointer"
                onClick={toggleNavigation} 
            />
        </nav>
    );
}
