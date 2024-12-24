export const Navbar = () => {
    return(
        <nav className="flex justify-between border border-gray-600 w-[1100px] bg-transparent items-center 
        mx-auto px-[30px] h-[60px] rounded-full fixed left-0 right-0 top-[20px] backdrop-blur-md z-50">
            <h1 className="font-bold text-[1.5rem]">PortScan</h1>
            <ul className="flex gap-2">
                <li><a href="#">Home</a></li>
                <li><a href="#">Steps</a></li>
                <li><a href="#">More</a></li>
                <li><a href="#">Catch</a></li>
            </ul>
        </nav>
    )
}