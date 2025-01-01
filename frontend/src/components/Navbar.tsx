import { Logo } from "../images";
import { HomeIcon, Link, PhoneCallIcon } from "lucide-react";
import { Button } from "./Button";

export const Navbar = () => {
    return(
        <nav className="flex justify-between px-12 py-6 items-center">
            <img src={Logo} alt="PortScan Logo"/>
            <ul className="flex gap-10">
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
            <Button className="" tag={"Analyze"} />
        </nav>
    )
}