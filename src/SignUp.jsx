import "./SignUp.css"
import {Link} from "react-router-dom";
import {useId, useState} from "react";
import {document} from "postcss";


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

    window.addEventListener('pageshow', function (evt) {
        // If persisted then it is in the page cache, force a reload of the page.
        if (evt.persisted) {
            console.log("yeah")
            document.body.style.display = 'none';
            location.reload();
        }
    });
    window.addEventListener("beforeunload", function () {
        document.getElementById("hi").display = "none"
    })
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
                <Link to="/sign-in" className="action-text" id="hi">I ALREADY HAVE AN ACCOUNT</Link>
            </form>
        </>
    )
}