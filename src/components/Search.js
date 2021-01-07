import React from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { useGlobalContext } from './context';

const Search = () => {

    const { handleSearchContacts } = useGlobalContext()

    return (
        <div className="search-container">
            <BiSearchAlt /> <input type="text" placeholder="Search contacts" className="search-input" onChange={handleSearchContacts} />
        </div>
    )
}

export default Search