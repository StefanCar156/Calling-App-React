import React from 'react'
import { CgBackspace } from "react-icons/cg";
import { MdCall, MdArrowBack } from "react-icons/md";
import { useGlobalContext } from './context';

const Keyboard = () => {

    const { isKeyboardOpen, closeKeyboard, handleCall, outputValue, setOutputValue } = useGlobalContext()

    const changeOutput = (digit) => {
        setOutputValue(outputValue + digit.toString())
    }

    const handleBackspace = () => {
        setOutputValue(outputValue.slice(0, -1))
    }

    return (
        <div className={`keyboard-container ${isKeyboardOpen && `show-keyboard`}`}>
            <div className="keyboard-output">
                <input type="text" className="keyboard-display" readOnly={true} value={outputValue} />
                <button className="keyboard-backspace" onClick={() => handleBackspace()}><CgBackspace /></button>
            </div>
            <div className="keyboard-digits">
                <button onClick={() => changeOutput(1)}>1</button>
                <button onClick={() => changeOutput(2)}>2</button>
                <button onClick={() => changeOutput(3)}>3</button>
                <button onClick={() => changeOutput(4)}>4</button>
                <button onClick={() => changeOutput(5)}>5</button>
                <button onClick={() => changeOutput(6)}>6</button>
                <button onClick={() => changeOutput(7)}>7</button>
                <button onClick={() => changeOutput(8)}>8</button>
                <button onClick={() => changeOutput(9)}>9</button>
                <button onClick={() => changeOutput("*")}>*</button>
                <button onClick={() => changeOutput(0)}>0</button>
                <button onClick={() => changeOutput("#")}>#</button>
            </div>
                <button className="call-btn" onClick={(e) => handleCall(e)}><MdCall /></button>
                <button className="back-btn" onClick={closeKeyboard} ><MdArrowBack /></button>
        </div>
    )
}

export default Keyboard