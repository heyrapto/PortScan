import { Logo } from "../images";
import { HomeIcon, Menu, Link, PhoneCallIcon, X } from "lucide-react";
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

            <div 
                className={`${
                    openNavigation ? "flex flex-col bg-blur-xl top-0 z-50 h-screen py-[50px] px-[30px]" : "hidden"
                } md:flex md:flex-row md:gap-10 transition-all duration-300 ease-in-out transform md:static absolute top-0 left-0 w-full md:w-auto`}>
                <ul className="flex md:flex-row md:gap-10 flex-col bg-transparent">
                    <div className="flex gap-1">
                        <HomeIcon className="text-gray-400 w-[15px] md:flex hidden" />
                        <li><a href="#" className="text-gray-500 md:text-[0.7rem] text-[1rem] hover:text-gray-300 transition ease-in-out duration-100">Home</a></li>
                    </div>
                    <div className="flex gap-1">
                        <Link className="text-gray-400 w-[15px] md:flex hidden" />
                        <li><a href="#" className="text-gray-500 md:text-[0.7rem] text-[1rem] hover:text-gray-300 transition ease-in-out duration-100">Paste links</a></li>
                    </div>
                    <div className="flex gap-1">
                        <PhoneCallIcon className="text-gray-400 w-[15px] md:flex hidden" />
                        <li><a href="#" className="text-gray-500 md:text-[0.7rem] text-[1rem] hover:text-gray-300 transition ease-in-out duration-100">Contact us</a></li>
                    </div>
                </ul>
                <Button className="md:hidden flex w-full mt-[20px]" tag={"Analyze"} />
                <X 
                className="w-[30px] text-gray-600 cursor-pointer md:hidden flex absolute top-[20px] right-[20px]"
                onClick={toggleNavigation} 
            />
            </div>
            <Button className="md:flex hidden" tag={"Analyze"} />

            {/* Mobile Menu Icon (Visible only on small screens) */}
            <Menu 
                className="w-[25px] text-gray-600 md:hidden flex cursor-pointer"
                onClick={toggleNavigation} 
            />
        </nav>
    );
}
