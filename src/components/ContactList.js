import React from 'react'
import Contact from './Contact'
import { useGlobalContext } from './context'

const ContactList = () => {

    const { list, searchContactValue } = useGlobalContext()

    return (
        <ul className="contact-list">
            {
                list.sort((a, b) => (a.contactName > b.contactName) ? 1 : -1).map((contact) => {
                    if (contact.contactName.toLowerCase().includes(searchContactValue.toLowerCase()) || contact.contactNumber.includes(searchContactValue) ) {
                        return <Contact key={contact.contactNumber} contact={contact} />
                    } else {
                        return null
                    } 
                })
            }
        </ul>
    )
}

export default ContactList