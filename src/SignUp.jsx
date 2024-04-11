import "./SignUp.css"
import {useId, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "./firebase.js"
import {Helmet} from "react-helmet";


export default function SignUp() {
    const navigate = useNavigate()



    const usernameid = useId()
    const emailid = useId()
    const passwordid = useId()
    const errorid = useId()
    const signupid = useId()


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
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    let userid = user.user.uid
                    setDoc(doc(db, "users", userid), {
                        id: userid,
                        email: email,
                        username: username,
                        bio: "Hi, I'm new to DOUBLE16!",
                        following: [],
                        ownedsnippets: [],
                        banner: "https://source.boringavatars.com/marble/500/" + username + "?colors=000000,FFFFFF,0E26EA,B700FF,FF0000&square"
                    }).then(() => {
                        navigate("/")
                    })
                })
                .catch((error) => {
                    const showError = (errormsg) => {
                        document.getElementById(errorid).innerText = "ERROR: " + errormsg
                        document.getElementById(errorid).style.opacity = "1"
                        setTimeout(() => document.getElementById(errorid).style.opacity = "0", 5000)
                    }
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === "auth/invalid-email") {
                        showError("INVALID EMAIL")
                    } else if (errorCode === "auth/weak-password") {
                        showError("PASSWORD TOO WEAK")
                    } else if (errorCode === "auth/email-already-in-use") {
                        showError("EMAIL ALREADY IN USE")
                    } else {
                        showError(errorCode)
                    }
                    console.log(errorCode, errorMessage)
                });


        }
    }

    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    const isIos = /iP(ad|od|hone)/i.test(window.navigator.userAgent)

    return (
        <>
            <Helmet>
                <title>DOUBLE16 | Sign Up</title>
                <meta content="DOUBLE16 | Sign Up"
                      name="title"/>
                <meta content="Create a DOUBLE16 account."
                      name="description"/>

                <meta content="https://double16.tech/sign-up" property="og:url"/>
                <meta content="DOUBLE16 | Sign Up" property="og:title"/>
                <meta content="Create a DOUBLE16 account."
                      property="og:description"/>

                <meta content="https://double16.tech/sign-up" property="twitter:url"/>
                <meta content="DOUBLE16 | Sign Up" property="twitter:title"/>
                <meta content="Create a DOUBLE16 account."
                      property="twitter:description"/>
            </Helmet>
            <form className="sign-form">
                <h1>SIGN_UP</h1>
                <p id={errorid} className="error-notice">ERROR: USERNAME ALREADY EXISTS</p>
                <input id={usernameid} type="text" placeholder="@username" name="username" autoComplete="username"
                       value={username} onChange={e => setUsername(e.target.value)}/><br/>
                <input id={emailid} type="email" placeholder="@email" name="email" autoComplete="email" value={email}
                       onChange={e => setEmail(e.target.value)}/><br/>
                <input id={passwordid} type="password" placeholder="@password" name="psw" autoComplete="new-password"
                       value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button id={signupid} type="submit" className="primary" onClick={e => {
                    document.getElementById(signupid).innerHTML = "LOADING..."
                    submit(e)
                }}>SIGN UP
                </button>
                <br/>
                {(isSafari || isIos) ? (
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