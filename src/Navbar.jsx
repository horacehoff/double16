import "./Navbar.css"
import Logo from "./assets/navlogo.svg?react"
import {useEffect, useId, useRef} from "react";
import {Link, useLocation} from "react-router-dom";
import "./firebase.js"

export default function Navbar() {
    const exploreid = useId()
    const menuexploreid = useId()
    const sellid = useId()
    const pricingid = useId()
    const aboutid = useId()
    const feedbackid = useId()
    const menufeedbackid = useId()
    const signupid = useId()
    const menusignupid = useId()



    const navMenuRef = useRef();
    const navMenuDivRef = useRef();
    const location = useLocation();

    useEffect(() => {
        screen.orientation.addEventListener("change", () => {
            if (navMenuDivRef.current.style.right !== "0px") {
                if (window.matchMedia("(max-width: 500px)").matches) {
                    navMenuDivRef.current.style.right = "-200px";
                } else {
                    navMenuDivRef.current.style.right = "-100%";
                }
            }
        })
    }, [])

    useEffect(() => {
        document.getElementById("root").style.pointerEvents = "all"
        document.getElementById("root").style.touchAction = "auto"

        if (window.matchMedia("(max-width: 500px)").matches) {
            navMenuDivRef.current.style.right = "-100%";
        } else {
            navMenuDivRef.current.style.right = "-200px";
        }
        navMenuRef.current.innerText = "||"
        if (!location.pathname.includes("/user")) {
            document.getElementsByClassName("nav")[0].style.backgroundColor = "transparent"
        }
        if (location.pathname.includes("/explore")) {
            document.getElementById(exploreid).style.color = "var(--color)"
            document.getElementById(exploreid).style.textDecoration = "underline"
            document.getElementById(menuexploreid).style.textDecoration = "underline"
        } else {
            document.getElementById(exploreid).style.color = null
            document.getElementById(exploreid).style.textDecoration = null
            document.getElementById(menuexploreid).style.textDecoration = null
        }
        if (location.pathname.includes("/sign-up")) {
            document.getElementById(signupid).style.color = "var(--color)"
            document.getElementById(signupid).style.textDecoration = "underline"
            document.getElementById(menusignupid).style.textDecoration = "underline"
        } else {
            document.getElementById(signupid).style.color = null
            document.getElementById(signupid).style.textDecoration = null
            document.getElementById(menusignupid).style.textDecoration = null
        }
        if (location.pathname.includes("/feedback")) {
            document.getElementById(feedbackid).style.color = "var(--color)"
            document.getElementById(feedbackid).style.textDecoration = "underline"
            document.getElementById(menufeedbackid).style.textDecoration = "underline"
        } else {
            document.getElementById(feedbackid).style.color = null
            document.getElementById(feedbackid).style.textDecoration = null
            document.getElementById(menufeedbackid).style.textDecoration = null
        }
    }, [location]);


    return (
        <>
            <div className="nav">
                <Link to="/"><Logo className="nav-logo"/></Link>
                <ul className="nav-list">
                    <li><Link to="/explore" id={exploreid}>EXPLORE</Link></li>
                    <li>SELL</li>
                    <li>PRICING</li>
                    <li>ABOUT</li>
                    <li><Link to="/feedback" id={feedbackid}>FEEDBACK</Link></li>
                    <li><Link to="/sign-up" id={signupid}>SIGN_UP</Link></li>
                    <li className="nav-menu" onClick={() => {
                        if (navMenuDivRef.current.style.right === "0px") {
                            if (window.matchMedia("(max-width: 500px)").matches) {
                                navMenuDivRef.current.style.right = "-100%";
                            } else {
                                navMenuDivRef.current.style.right = "-200px";
                            }
                            navMenuRef.current.innerText = "||"

                        } else {
                            navMenuDivRef.current.style.right = "0"
                            navMenuRef.current.innerText = "//"
                        }
                    }} ref={navMenuRef}>
                        ||
                    </li>
                </ul>
            </div>
            <div ref={navMenuDivRef} className="nav-menu-extra">
                <ul className="nav-list-extra">
                    <li><Link to="/explore" id={menuexploreid}>EXPLORE</Link></li>
                    <li>SELL</li>
                    <li>PRICING</li>
                    <li>ABOUT</li>
                    <li><Link to="/feedback" id={menufeedbackid}>FEEDBACK</Link></li>
                    <li><Link to="/sign-up" id={menusignupid}>SIGN_UP</Link></li>
                </ul>
            </div>
        </>)
}