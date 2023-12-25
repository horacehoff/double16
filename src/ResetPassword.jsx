import {Link} from "react-router-dom";
import {useId, useState} from "react";
import "./ResetPassword.css"

export default function ResetPassword() {
    const emailid = useId()
    const passwordid = useId()
    const errorid = useId()


    const [email, setEmail] = useState("")

    function submit(e) {
        e.preventDefault()
    }

    return (
        <>
            <form className="sign-form reset-form">
                <h1>RESET_PASSWORD</h1>
                <p id={errorid}>ERROR: USERNAME ALREADY EXISTS</p>
                <input id={emailid} type="email" placeholder="@email" name="email" autoComplete="email" value={email}
                       onChange={e => setEmail(e.target.value)}/><br/>
                <button type="submit" className="primary" onClick={e => submit(e)}>RESET PASSWORD
                </button>
                <br/>
                <Link to="/sign-in" className="action-text sign-action">SIGN_IN</Link>
                <Link to="/sign-up" className="action-text sign-action">SIGN_UP</Link>
            </form>
        </>
    )
}