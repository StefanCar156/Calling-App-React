import React, { useState } from 'react'
import { MdCallEnd, MdDialpad, MdMic, MdMicOff, MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { useGlobalContext } from './context';
import callingSound from '../calling-sound.mp3'

const CallScreen = () => {

    const { handleEndCall, isCalling, callInfo, openKeyboard } = useGlobalContext()
    const { inCallAvatar, inCallName, inCallNumber} = callInfo
    const [isMicMuted, setIsMicMuted] = useState(false)
    const [isSpeakerOn, setIsSpeakerOn] = useState(false)
    const sound = document.querySelector(".calling-sound")

    if (isCalling) {
        sound.play()
        sound.volume = 0.15
        if (isSpeakerOn) {
            sound.volume = 1
        }
        sound.onended = handleEndCall
    }

    return <div className={`call-screen-container ${isCalling && `call-screen-active`}`}>
        <audio className="calling-sound">
            <source src={callingSound}/>
        </audio>
        <div className="call-contact-info">
            <div className="call-contact-avatar">{inCallAvatar}</div>
            <h1 className="call-contact-name">{inCallName}</h1>
            <h3 className="call-contact-number">{inCallNumber}</h3>
            <p className="call-status">Ringing<span>.</span><span>.</span><span>.</span></p>
        </div>
        <ul className="call-screen-options">
            <li onClick={() => setIsMicMuted(!isMicMuted)}>{isMicMuted ? <MdMic /> : <MdMicOff />}Turn {isMicMuted ? `on` : `off`}</li>
            <li onClick={openKeyboard}><MdDialpad /> Keyboard</li>
            <li onClick={() => setIsSpeakerOn(!isSpeakerOn)}>{isSpeakerOn ? <MdVolumeOff /> : <MdVolumeUp />}Turn {isSpeakerOn ? `off` : `on` }</li>
        </ul>
        <button className="end-call-btn" onClick={handleEndCall}><MdCallEnd /></button>
    </div>
}

export default CallScreen;