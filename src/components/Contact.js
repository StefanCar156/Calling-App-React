import React from 'react'
import {MdCall} from "react-icons/md";
import { useGlobalContext } from './context'

const Contact = ({contact}) => {
    const {contactName, contactNumber} = contact
    const { handleCall, handleOpenEditContact } = useGlobalContext()

    return (
        <div className="contact">
            <div className="contact-avatar" onClick={handleOpenEditContact}>
                {contactName.charAt(0)}
            </div>
            <div className="contact-info">
                <h3 className="contact-name">{contactName}</h3>
                <h4 className="contact-number">{contactNumber}</h4>
            </div>
            <button className="contact-call-btn" onClick={(e) => handleCall(e)}><MdCall /></button>
        </div>
    )
}

export default Contact