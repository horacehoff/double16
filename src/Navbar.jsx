import "./Navbar.css"
import Logo from "./assets/navlogo.svg?react"
import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";

export default function Navbar() {
    const navMenuRef = useRef();
    const navMenuDivRef = useRef();
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

    return (<>
        <div className="nav">
            <Link to="/"><Logo className="nav-logo"/></Link>
            <ul className="nav-list">
                <li><Link to="/explore">EXPLORE</Link></li>
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
                <li><Link to="/explore">EXPLORE</Link></li>
                <li>SELL</li>
                <li>PRICING</li>
                <li>ABOUT</li>
                <li>FEEDBACK</li>
                <li>SIGN_UP</li>
            </ul>
        </div>
    </>)
}