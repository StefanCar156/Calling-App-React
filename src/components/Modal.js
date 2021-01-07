import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {

    const { isModalOpen, setIsModalOpen, modalMessage, modalButtons, confirmCloseAddContact } = useGlobalContext()

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className={`modal-overlay ${isModalOpen && `modal-open`}`}>
            <div className="modal-container">
                <p className="modal-msg">{modalMessage}</p>
                <div className="modal-buttons">
                    {
                        modalButtons.map((btn) => {
                            const handleModalButtons = (e) => {
                                if (e.target.textContent === "Yes") {
                                    handleCloseModal()
                                    confirmCloseAddContact()
                                } else if (e.target.textContent === "OK" || e.target.textContent === "Cancel") {
                                    handleCloseModal()
                                }
                            }
                            return <button key={btn} onClick={handleModalButtons}>{btn}</button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal