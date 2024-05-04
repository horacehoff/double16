import "./Navbar.css"
import Logo from "./assets/navlogo.svg?react"
import {useEffect, useId, useRef} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {auth, userdb} from "./firebase.js"
import {onAuthStateChanged, signOut} from 'firebase/auth';

export default function Navbar() {
    const exploreid = useId()
    const menuexploreid = useId()
    const sellid = useId()
    const menusellid = useId()
    const pricingid = useId()
    const aboutid = useId()
    const menuaboutid = useId()
    const feedbackid = useId()
    const menufeedbackid = useId()
    const signupid = useId()
    const settingsid = useId()
    const signoutid = useId()
    const signupli_id = useId()
    const signupextraid = useId()
    const menusignupid = useId()
    const menuaccountid = useId()
    const menusettingsid = useId()
    const menufavoritesid = useId()



    const navMenuRef = useRef();
    const navMenuDivRef = useRef();
    const navAccountMenuDivRef = useRef();
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        screen.orientation.addEventListener("change", () => {
            if (navMenuDivRef.current.style.right !== "0px") {
                navMenuDivRef.current.style.right = null;
                navAccountMenuDivRef.current.style.right = null;
            }
        })
    }, [])

    function waitForData() {
        if (userdb) {
            document.getElementById(signupid).innerHTML = 'ACCOUNT'
            document.getElementById(signupid).href = "/" + userdb.username
            document.getElementById(signupid).onclick = (e) => {
                e.preventDefault()
                navigate("/" + userdb.username)
                window.location.reload()
            }
            document.getElementById(menusignupid).innerHTML = 'ACCOUNT'
            document.getElementById(menuaccountid).href = "/" + userdb.username
            document.getElementById(menuaccountid).onclick = (e) => {
                e.preventDefault()
                navigate("/" + userdb.username)
                window.location.reload()
            }
            document.getElementById(menusettingsid).href = "/settings/"
            document.getElementById(menusettingsid).onclick = (e) => {
                e.preventDefault()
                navigate("/settings/")
            }
            document.getElementById(menufavoritesid).href = "/favorites"
            document.getElementById(menufavoritesid).onclick = (e) => {
                e.preventDefault()
                navigate("/favorites")
            }

            document.getElementById(menusignupid).onclick = (e) => {
                e.preventDefault()
                navAccountMenuDivRef.current.style.right = "0"
            }
            document.getElementById(signupli_id).classList.add("nav-list-signup-hover")
        } else {
            setTimeout(waitForData, 50);
        }
    }


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                waitForData()
            }
        })
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)

        document.getElementById("root").style.pointerEvents = "all"
        document.getElementById("root").style.touchAction = "auto"

        navMenuDivRef.current.style.right = null;
        navAccountMenuDivRef.current.style.right = null;

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
        if (location.pathname.includes("/create")) {
            document.getElementById(sellid).style.color = "var(--color)"
            document.getElementById(sellid).style.textDecoration = "underline"
            document.getElementById(menusellid).style.textDecoration = "underline"
        } else {
            document.getElementById(sellid).style.color = null
            document.getElementById(sellid).style.textDecoration = null
            document.getElementById(menusellid).style.textDecoration = null
        }
        if (location.pathname.includes("/about")) {
            document.getElementById(aboutid).style.color = "var(--color)"
            document.getElementById(aboutid).style.textDecoration = "underline"
            document.getElementById(menuaboutid).style.textDecoration = "underline"
        } else {
            document.getElementById(aboutid).style.color = null
            document.getElementById(aboutid).style.textDecoration = null
            document.getElementById(menuaboutid).style.textDecoration = null
        }
    }, [location]);


    return (
        <>
            <div className="nav">
                <Link to="/"><Logo className="nav-logo"/></Link>
                <ul className="nav-list">
                    <li><Link to="/explore" id={exploreid}>EXPLORE</Link></li>
                    <li><Link to="/create" id={sellid}>CREATE</Link></li>
                    {/*<li>PRICING</li>*/}
                    <li><Link to="/about" id={aboutid}>ABOUT</Link></li>
                    <li><Link to="/feedback" id={feedbackid}>FEEDBACK</Link></li>
                    <li className="nav-list-signup" id={signupli_id}>
                        <Link to="/sign-up" id={signupid}>SIGN_UP</Link>
                        <div className="nav-list-account" id={signupextraid}>
                            <Link to="/favorites" id={settingsid}>FAVORITES</Link>
                            <br/>
                            <Link to="/settings" id={settingsid}>SETTINGS</Link>
                            <br/>
                            <a href="#" id={signoutid} onClick={() => {
                                signOut(auth).then(() => {
                                    navigate("/")
                                    window.location.reload()
                                })
                            }}>SIGN OUT</a>
                            <br/>
                        </div>

                    </li>
                    <li className="nav-menu" onClick={() => {
                        if (navMenuDivRef.current.style.right === "0px") {
                            navMenuDivRef.current.style.right = null;
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
                    <li><Link to="/create" id={menusellid}>CREATE</Link></li>
                    {/*<li>PRICING</li>*/}
                    <li><Link to="/about" id={menuaboutid}>ABOUT</Link></li>
                    <li><Link to="/feedback" id={menufeedbackid}>FEEDBACK</Link></li>
                    <li><Link to="/sign-up" id={menusignupid}>SIGN_UP</Link></li>
                </ul>
            </div>
            <div ref={navAccountMenuDivRef} id="nav-menu-extra" className="nav-menu-extra">
                <ul className="nav-list-extra">
                    <li onClick={() => {
                        if (window.matchMedia("(max-width: 500px)").matches) {
                            navAccountMenuDivRef.current.style.right = "-100%";
                        } else {
                            navAccountMenuDivRef.current.style.right = "-200px";
                        }
                    }}>
                        {"<-"}
                    </li>
                    <li><Link to="" id={menuaccountid}>ACCOUNT</Link></li>
                    <li><Link to="" id={menusettingsid}>SETTINGS</Link></li>
                    <li><Link to="" id={menufavoritesid}>FAVORITES</Link></li>
                    <li onClick={() => {
                        signOut(auth).then(() => {
                            navigate("/")
                            window.location.reload()
                        })
                    }}>SIGN_OUT
                    </li>
                </ul>
            </div>
        </>)
}