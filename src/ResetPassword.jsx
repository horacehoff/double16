import {Link, useNavigate} from "react-router-dom";
import {useId, useState} from "react";
import "./ResetPassword.css"
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "./firebase.js";


export default function ResetPassword() {
    const navigate = useNavigate()
    const emailid = useId()
    const resetbtnid = useId()

    const [email, setEmail] = useState("")


    function submit(e) {
        e.preventDefault()
        sendPasswordResetEmail(auth, email).then(() => {
            document.getElementById(resetbtnid).innerHTML = "✅ CHECK YOUR MAIL"
            setTimeout(() => {
                navigate("/sign-in")
            }, 2000)
        })
    }

    return (
        <>
            <form className="sign-form reset-form">
                <h1>RESET_PASSWORD</h1>
                <input id={emailid} type="email" placeholder="@email" name="email" autoComplete="email" value={email}
                       onChange={e => setEmail(e.target.value)}/><br/>
                <button id={resetbtnid} type="submit" className="primary" onClick={e => submit(e)}>RESET PASSWORD
                </button>
                <br/>
                <Link to="/sign-in" className="action-text sign-action">SIGN_IN</Link>
                <Link to="/sign-up" className="action-text sign-action">SIGN_UP</Link>
            </form>
        </>
    )
}