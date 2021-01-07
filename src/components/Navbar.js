import React from 'react'
import { CgKeyboard, CgUserAdd } from "react-icons/cg";
import { useGlobalContext } from './context';

const Navbar = () => {

    const {openKeyboard, openAddContact}  = useGlobalContext()

    return <nav>
        <ul>
            <li onClick={openKeyboard}><CgKeyboard />Keyboard</li>
            <li onClick={openAddContact} ><CgUserAdd />Add Contact</li>
        </ul>
    </nav>
}

export default Navbar