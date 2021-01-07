import React, { useState, useContext } from "react"

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const getLocalStorage = () => {
        let list = localStorage.getItem('list')
        if (list) {
            return JSON.parse(localStorage.getItem('list'))
        } 
        else {
          return []
        }
    }

    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
    const [outputValue, setOutputValue] = useState("")
    const [isAddContactOpen, setIsAddContactOpen] = useState(false)
    const [newContactName, setNewContactName] = useState("")
    const [newContactNumber, setNewContactNumber] = useState("")
    const [list, setList] = useState(getLocalStorage())
    const [searchContactValue, setSearchContactValue] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [modalButtons, setModalButtons] = useState([])
    const [isEditingContact, setIsEditingContact] = useState(false)
    const [editId, setEditId] = useState(null)
    const [isCalling, setIsCalling] = useState(false)
    const [callInfo, setCallInfo] = useState({})
    

    const openKeyboard = () => {
        setIsKeyboardOpen(true)
    }
    const closeKeyboard = () => {
        setIsKeyboardOpen(false)
    }
    const handleCall = (e) => {
        if (isCalling) {
            setIsModalOpen(true)
            setModalMessage("You are already in call")
            setModalButtons(["OK"])
            setIsKeyboardOpen(false)
            return null
        }
        
        setIsCalling(true)

        if (e.target.classList.contains("call-btn")) {
            let inCallAvatar = "U"
            let inCallName = "Unknown"
            let inCallNumber = outputValue

            list.map((item) => {
                if (item.contactNumber === inCallNumber) {
                    inCallName = item.contactName
                    inCallNumber = item.contactNumber
                    inCallAvatar = item.contactName.charAt(0)
                }
                return null
            })

            setIsKeyboardOpen(false)
            setOutputValue("")
            setCallInfo({inCallAvatar, inCallName, inCallNumber})
        } else {
            const inCallAvatar = e.target.parentElement.children[0].textContent
            const inCallName = e.target.parentElement.children[1].children[0].textContent
            const inCallNumber = e.target.parentElement.children[1].children[1].textContent
            
            setCallInfo({inCallAvatar, inCallName, inCallNumber})
        }
    }

    const handleEndCall = () => {
        setIsCalling(false)
        setCallInfo({})
        setIsModalOpen(true)
        setModalMessage("Call ended")
        setModalButtons([])
        setTimeout(() => {
            setIsModalOpen(false)
        }, 1500)
        document.querySelector(".calling-sound").pause()
        document.querySelector(".calling-sound").currentTime = 0;
    }

    const clearAddContactForm = () => {
        setNewContactName("")
        setNewContactNumber("")
    }

    const handleOpenEditContact = (e) => {
        setIsEditingContact(true)
        const editName = e.target.nextSibling.children[0].textContent
        const editNumber = e.target.nextSibling.children[1].textContent

        setIsAddContactOpen(true)
        setNewContactName(editName)
        setNewContactNumber(editNumber)
        setEditId(editNumber)
    }

    const handleSearchContacts = (e) => {
        setSearchContactValue(e.target.value)
    }

    const openAddContact = () => {
        setIsAddContactOpen(true)
    }

    const confirmCloseAddContact = () => {
        clearAddContactForm()
        setIsAddContactOpen(false)
        setIsEditingContact(false)
    }

    const closeAddContact = (e) => {
        e.preventDefault();
        if (newContactName !== "" || newContactNumber !== "") {
            setIsModalOpen(true)
            setModalMessage("Changes you made will not be saved. Are you sure want to quit?")
            setModalButtons(["Yes", "Cancel"])
        } else {
            confirmCloseAddContact()
        }
    }

    const handleRemoveContact = (e) => {
        e.preventDefault()
        list.map((item) => {
            if (item.contactNumber === editId) {
                list.splice(list.indexOf(item), 1)                
                setList([...list])
                localStorage.setItem( 'list' , JSON.stringify(list))
                setEditId(null)
                setIsEditingContact(false)
                setIsModalOpen(true)
                setModalMessage(`Contact removed`)
                setModalButtons([])
                setTimeout(() => {
                    setIsAddContactOpen(false)
                    setIsModalOpen(false)
                }, 1000) 
                clearAddContactForm()
            }
            return null
        })
    }

    const handleAddContact = (e) => {
        e.preventDefault()
        if (!newContactName || !newContactNumber) {
            setIsModalOpen(true)
            setModalMessage("Please fill in all fields")
            setModalButtons(["OK"])
            return null
        }

        if (isEditingContact) {
            list.map((item) => {
                if (item.contactNumber === editId) {
                    list.splice(list.indexOf(item), 1)
                    let newContact = {
                        contactName: newContactName,
                        contactNumber: newContactNumber
                    }
                    setList([...list, newContact])
                    localStorage.setItem( 'list' , JSON.stringify([...list, newContact]))
                } 
                return null
            })
            setEditId(null)
            setIsEditingContact(false)
            setIsModalOpen(true)
            setModalMessage("Contact updated")
            setModalButtons(["OK"])
            setTimeout(() => {
                setIsAddContactOpen(false)
            }, 1000) 
            clearAddContactForm()
            return null
        }

        for (let i in list) {
            if ( list[i].contactNumber === newContactNumber ) {
                setIsModalOpen(true)
                setModalMessage("This number already exists")
                setModalButtons(["OK"])
                return null
            }
        }

        let newContact = {
            contactName: newContactName,
            contactNumber: newContactNumber
        }

        setList([...list, newContact])
        localStorage.setItem( 'list' , JSON.stringify([...list, newContact]))
        setIsModalOpen(true)
        setModalMessage("Contact added")
        setModalButtons(["OK"])
        setNewContactNumber("")
        setNewContactName("")
        setTimeout(() => {
            setIsAddContactOpen(false)
        }, 1000); 
    }

    return <AppContext.Provider value={{isKeyboardOpen, openKeyboard, closeKeyboard, isAddContactOpen, openAddContact, closeAddContact, confirmCloseAddContact, handleRemoveContact, handleAddContact, newContactName, setNewContactName, newContactNumber, setNewContactNumber, list, handleCall, searchContactValue, handleSearchContacts, isModalOpen, setIsModalOpen, modalMessage, modalButtons, handleOpenEditContact, isEditingContact, isCalling, handleEndCall, callInfo, outputValue, setOutputValue}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
     return useContext(AppContext)
}

export {AppContext, AppProvider}
