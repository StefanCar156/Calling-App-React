import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from './context';

const AddContact = () => {

    const { isAddContactOpen, closeAddContact, handleAddContact, newContactName, newContactNumber, setNewContactName, setNewContactNumber, isEditingContact, handleRemoveContact } = useGlobalContext()

    const handleChangeName = (e) => {
        setNewContactName(e.target.value)
    }
    const handleChangeNumber = (e) => {
        setNewContactNumber(e.target.value)
    }

    return (
        <form className={`add-contact-form ${isAddContactOpen && `add-contact-form-active` }`}>
            <button className="close-add-contact-btn" onClick={closeAddContact} ><AiOutlineClose /></button>
            <label htmlFor="name">
                Name: 
                <input type="text" 
                maxLength="25"
                onChange={handleChangeName} 
                value={newContactName}/>
            </label>
            <label htmlFor="number">
                Number: 
                <input type="text" 
                maxLength="25"
                onChange={handleChangeNumber}
                value={newContactNumber}
                />
            </label>
            <div className="add-contact-btns">
                <button className="add-contact-btn" onClick={handleAddContact}>{isEditingContact ? `Update contact` : `Add contact`}</button>
                {
                    isEditingContact ? <button onClick={handleRemoveContact} className="remove-contact-btn">Remove contact</button> : null
                }
            </div>
            
        </form>
    )
}

export default AddContact