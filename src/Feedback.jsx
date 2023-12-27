import "./Feedback.css"
import {useId, useState} from "react";

export default function Feedback() {
    const errorid = useId()
    const [email, setEmail] = useState("")
    const [feedback, setFeedback] = useState("")

    function submit(e) {
        e.preventDefault()
        let validated = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (validated === null) {
            document.getElementById(errorid).style.opacity = "1"
            setTimeout(() => document.getElementById(errorid).style.opacity = "0", 5000)
        }
    }

    return (
        <>
            <h1 className="pg-heading" id="pg-heading">FEEDBACK</h1>
            <h2 className="pg-subtitle">GIVE YOUR FEEDBACK ON THE WEBSITE</h2>
            <div className="sign-form fdck-form">
                <p id={errorid}>ERROR: INVALID EMAIL</p>
                <input type="email" placeholder="@email" value={email} onChange={e => setEmail(e.target.value)}/>
                <br/>
                <textarea placeholder="@feedback" value={feedback} onChange={e => setFeedback(e.target.value)}/>
                <br/>
                <button className="primary" onClick={e => submit(e)}>SUBMIT</button>
            </div>
        </>
    )
}