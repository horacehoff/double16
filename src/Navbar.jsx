import "./Navbar.css"
import Logo from "./assets/navlogo.svg?react"
import {useEffect, useRef} from "react";

export default function Navbar() {
    const navMenuRef = useRef();
    const navMenuDivRef = useRef();
    useEffect(() => {
        screen.orientation.addEventListener("change", () => {
            if (window.matchMedia("(max-width: 500px)").matches) {
                navMenuDivRef.current.style.right = "-100%";
            } else {
                navMenuDivRef.current.style.right = "-200px";
            }
        })
    }, [])

    return (<>
        <div className="nav">
            <Logo className="nav-logo"/>
            <ul className="nav-list">
                <li>EXPLORE</li>
                <li>SELL</li>
                <li>PRICING</li>
                <li>ABOUT</li>
                <li>FEEDBACK</li>
                <li>SIGN_UP</li>
                <li className="nav-menu" onClick={() => {
                    if (navMenuDivRef.current.style.right === "0px") {
                        if (window.matchMedia("(max-width: 500px)").matches) {
                            navMenuDivRef.current.style.right = "-100%";
                        } else {
                            if (window.matchMedia("(orientation: landscape) and (max-height: 400px)").matches) {
                                navMenuDivRef.current.style.right = "-100%";
                            } else {
                                navMenuDivRef.current.style.right = "-200px";
                            }
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
                <li>EXPLORE</li>
                <li>SELL</li>
                <li>PRICING</li>
                <li>ABOUT</li>
                <li>FEEDBACK</li>
                <li>SIGN_UP</li>
            </ul>
        </div>
    </>)
}