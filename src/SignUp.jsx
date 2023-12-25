import "./SignUp.css"
import {useId, useState} from "react";
import {document} from "postcss";
import {Link} from "react-router-dom";


export default function SignUp() {
    const usernameid = useId()
    const emailid = useId()
    const passwordid = useId()
    const errorid = useId()


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function submit(e) {
        e.preventDefault()
        if (username === "" || !username.trim()) {
            document.getElementById(usernameid).style.borderColor = "red"
            setTimeout(() => document.getElementById(usernameid).style.borderColor = null, 2000)
        }
        if (email === "" || !email.trim()) {
            document.getElementById(emailid).style.borderColor = "red"
            setTimeout(() => document.getElementById(emailid).style.borderColor = null, 2000)
        }
        if (password === "" || !password.trim()) {
            document.getElementById(passwordid).style.borderColor = "red"
            setTimeout(() => document.getElementById(passwordid).style.borderColor = null, 2000)
        }
        if (username !== "" && username.trim() && email !== "" && email.trim() && password !== "" && password.trim()) {
            document.getElementById(errorid).style.opacity = "1"
            setTimeout(() => document.getElementById(errorid).style.opacity = "0", 5000)
        }
    }

    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    return (
        <>
            <form className="sign-form">
                <h1>SIGN_UP</h1>
                <p id={errorid}>ERROR: USERNAME ALREADY EXISTS</p>
                <input id={usernameid} type="text" placeholder="@username" name="username" autoComplete="username"
                       value={username} onChange={e => setUsername(e.target.value)}/><br/>
                <input id={emailid} type="email" placeholder="@email" name="email" autoComplete="email" value={email}
                       onChange={e => setEmail(e.target.value)}/><br/>
                <input id={passwordid} type="password" placeholder="@password" name="psw" autoComplete="new-password"
                       value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit" className="primary" onClick={e => submit(e)}>SIGN UP
                </button>
                <br/>
                {isSafari ? (
                    <a href="/sign-in" className="action-text">
                        I ALREADY HAVE AN ACCOUNT
                    </a>
                ) : (
                    <Link to="/sign-in" className="action-text">
                        I ALREADY HAVE AN ACCOUNT
                    </Link>
                )}
            </form>
        </>
    )
}