import "./SignUp.css"
import "./SignIn.css"
import {useId, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "./firebase.js";
import {Helmet} from "react-helmet";

export default function SignIn() {
    const emailid = useId()
    const passwordid = useId()
    const errorid = useId()
    const signinid = useId()


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

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
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const showError = (errormsg) => {
                        document.getElementById(errorid).innerText = "ERROR: " + errormsg
                        document.getElementById(errorid).style.opacity = "1"
                        setTimeout(() => document.getElementById(errorid).style.opacity = "0", 5000)
                    }
                    if (errorCode === "auth/invalid-email") {
                        showError("Invalid email")
                    } else if (errorCode === "auth/invalid-credential") {
                        showError("Wrong email/password")
                    } else {
                        showError(errorCode)
                    }
                    console.log(errorCode, errorMessage)
                });
        }
    }
    return (
        <>
            <Helmet>
                <title>Double16 | Sign In</title>
                <meta content="Double16 | Sign In"
                      name="title"/>
                <meta content="Sign in to your Double16 account."
                      name="description"/>

                <meta content="https://www.double16.tech/sign-in" property="og:url"/>
                <meta content="Double16 | Sign In" property="og:title"/>
                <meta content="Sign in to your Double16 account."
                      property="og:description"/>

                <meta content="https://www.double16.tech/sign-in" property="twitter:url"/>
                <meta content="Double16 | Sign In" property="twitter:title"/>
                <meta content="Sign in to your Double16 account."
                      property="twitter:description"/>
            </Helmet>
            <form className="sign-form">
                <h1>SIGN_IN</h1>
                <p id={errorid} className="error-notice uppercase">ERROR: Username already exists</p>
                <input id={emailid} type="email" placeholder="Email" name="email" autoComplete="email" value={email}
                       onChange={e => setEmail(e.target.value)}/><br/>
                <input id={passwordid} type="password" placeholder="Password" name="psw"
                       autoComplete="current-password"
                       value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button id={signinid} type="submit" className="primary" onClick={e => {
                    document.getElementById(signinid).innerHTML = "Loading..."
                    submit(e)
                    document.getElementById(signinid).innerHTML = "Sign In"
                }}>Sign In
                </button>
                <br/>
                <Link to="/reset-password" className="action-text sign-action">RESET_PASSWORD</Link>
                <Link to="/sign-up" className="action-text sign-action">SIGN_UP</Link>
            </form>
        </>
    )
}