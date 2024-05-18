import "./Feedback.css"
import {useId, useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import {db, userdb} from "./firebase.js";
import {v1} from "uuid";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function Feedback() {
    const navigate = useNavigate()
    const errorid = useId()
    const [email, setEmail] = useState("")
    const [feedback, setFeedback] = useState("")

    function checkValid(str) {
        return /\S/.test(str) && str !== "";
    }

    function submit(e) {
        e.preventDefault()
        let validated = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!userdb) {
            document.getElementById(errorid).innerText = "ERROR: You need to sign in"
            document.getElementById(errorid).style.opacity = "1"
            setTimeout(() => document.getElementById(errorid).style.opacity = "0", 5000)
        } else if (validated === null || !email || email === "" || !checkValid(email)) {
            document.getElementById(errorid).style.opacity = "1"
            setTimeout(() => document.getElementById(errorid).style.opacity = "0", 5000)
        } else if (!feedback || feedback === "" || !checkValid(feedback)) {
            document.getElementById(errorid).innerText = "ERROR: Invalid feedback"
            document.getElementById(errorid).style.opacity = "1"
            setTimeout(() => document.getElementById(errorid).style.opacity = "0", 5000)
        } else if (validated && email && email !== "" && checkValid(email) && feedback && feedback !== "" && checkValid(feedback) && userdb) {
            setDoc(doc(db, "feedback", v1()), {
                email: email,
                feedback: feedback,
                created: Date.now()
            }).then(() => {
                navigate("/")
            })
        }
    }

    return (
        <>
            <Helmet>
                <title>Double16 | Feedback</title>
                <meta content="Double16 | Feedback"
                      name="title"/>
                <meta content="Give your feedback on Double16."
                      name="description"/>

                <meta content="https://www.double16.tech/feedback" property="og:url"/>
                <meta content="Double16 | Feedback" property="og:title"/>
                <meta content="Give your feedback on Double16."
                      property="og:description"/>

                <meta content="https://www.double16.tech/feedback" property="twitter:url"/>
                <meta content="Double16 | Feedback" property="twitter:title"/>
                <meta content="Give your feedback on Double16."
                      property="twitter:description"/>
            </Helmet>
            <h1 className="pg-heading" id="pg-heading">Feedback</h1>
            <h2 className="pg-subtitle">Give your feedback on the website</h2>
            <div className="sign-form fdck-form">
                <p id={errorid} className="error-notice uppercase">ERROR: Invalid email</p>
                <input type="email" placeholder="@email" value={email} onChange={e => setEmail(e.target.value)}/>
                <br/>
                <textarea placeholder="@feedback" value={feedback} onChange={e => setFeedback(e.target.value)}/>
                <br/>
                <button className="primary" onClick={e => submit(e)}>Submit</button>
            </div>
        </>
    )
}