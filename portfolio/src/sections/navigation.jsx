import { useState } from "react";
import { navLinks } from "../constants/index.js";

const NavItems = () => {
    return (
        <ul className="nav-ul">
            {navLinks.map(({id, href, name}) => (
                <li key={id} className="nav-li">
                    <a href={href} className="nav-li_a" onClick={() => {}}>
                        {name}
                    </a>
                </li>
            ))}
        </ul>
    )
}

const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen) 

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between py-5 mx-auto c-space">
                    <a href="/" className="text-xl font-bold transition-colors text-neutral-400 hover:text-purple-500">
                        Portfolio
                    </a>

                    <button onClick={toggleMenu} className="flex text-neutral-400 hover:text-purple-500 focus:outline-none sm:hidden" aria-label="Toggle menu">
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className="w-6 h-6" />
                    </button> 

                    <nav className="hidden sm:flex ">
                        <NavItems/>
                    </nav>
                </div>
            </div>

            <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <nav className="p-5">
                    <NavItems/>
                </nav>
            </div>

        </header>
    )
}

export default Navigation