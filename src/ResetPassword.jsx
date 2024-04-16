import {Link, useNavigate} from "react-router-dom";
import {useId, useState} from "react";
import "./ResetPassword.css"
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "./firebase.js";
import {Helmet} from "react-helmet";


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
            <Helmet>
                <title>Double16 | Reset Password</title>
                <meta content="Double16 | Reset Password"
                      name="title"/>
                <meta content="Reset your account password."
                      name="description"/>

                <meta content="https://www.double16.tech/reset-password" property="og:url"/>
                <meta content="Double16 | Reset Password" property="og:title"/>
                <meta content="Reset your account password."
                      property="og:description"/>

                <meta content="https://www.double16.tech/reset-password" property="twitter:url"/>
                <meta content="Double16 | Reset Password" property="twitter:title"/>
                <meta content="Reset your account password."
                      property="twitter:description"/>
            </Helmet>
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