import "./SignUp.css"
import "./SignIn.css"
import {useId, useState} from "react";
import {Link} from "react-router-dom";

export default function SignIn() {
    const emailid = useId()
    const passwordid = useId()
    const errorid = useId()


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function submit(e) {
        e.preventDefault()
        if (email === "" || !email.trim()) {
            document.getElementById(emailid).style.borderColor = "red"
            setTimeout(() => document.getElementById(emailid).style.borderColor = null, 2000)
        }
        if (password === "" || !password.trim()) {
            document.getElementById(passwordid).style.borderColor = "red"
            setTimeout(() => document.getElementById(passwordid).style.borderColor = null, 2000)
        }
        if (email !== "" && email.trim() && password !== "" && password.trim()) {
            document.getElementById(errorid).style.opacity = "1"
            setTimeout(() => document.getElementById(errorid).style.opacity = "0", 5000)
        }
    }

    const isIOS5 = /iphone|ipod|ipad/i.test(navigator.platform) && /os 5/i.test(navigator.userAgent);

    if (isIOS5) {
        window.addEventListener('pageshow', function (evt) {
            // If persisted then it is in the page cache, force a reload of the page.
            if (evt.persisted) {
                console.log("yeah")
                document.body.style.display = 'none';
                location.reload();
            }
        });
        window.addEventListener("unload", function () {
            console.log("yeahhh")
        })
    }

    return (
        <>
            <form className="sign-form">
                <h1>SIGN_IN</h1>
                <p id={errorid}>ERROR: USERNAME ALREADY EXISTS</p>
                <input id={emailid} type="email" placeholder="@email" name="email" autoComplete="email" value={email}
                       onChange={e => setEmail(e.target.value)}/><br/>
                <input id={passwordid} type="password" placeholder="@password" name="psw"
                       autoComplete="current-password"
                       value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit" className="primary" onClick={e => submit(e)}>SIGN IN
                </button>
                <br/>
                <Link to="/reset-password" className="action-text sign-action" id="something else">RESET_PASSWORD</Link>
                <Link to="/sign-up" className="action-text sign-action" id="something else">SIGN_UP</Link>
            </form>
        </>
    )
}