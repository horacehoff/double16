import "./Home.css"
import logo from "./assets/navlogo.svg"
import React, {useEffect} from "react";
import throttle from 'lodash.throttle'
import {Link} from "react-router-dom";


export default function Home() {
    const wrapper = <>
        <ul>
            {[...Array(Math.floor(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 200))].map((_, index) => (
                <>
                    <li>CODE.BUY.SELL.</li>
                </>
            ))}
        </ul>
    </>

    const wrappertwo = <>
        <ul className="home-wrapper-image-list">
            {[...Array(Math.floor(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 100))].map((_, index) => (
                <>
                    <li>
                        <img src={logo} alt="DOUBLE16"/>
                    </li>
                </>
            ))}
        </ul>
    </>


    function getRandomFloat(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min + 1) + min;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    useEffect(() => {
        document.querySelector(".nav").style.opacity = 0
        document.querySelector(".nav").style.backgroundColor = "var(--color-flip)"
        setTimeout(() => {
            document.querySelector(".nav").style.opacity = 1
        }, 1000)


        document.querySelectorAll(".home-wrapper ul").forEach((item) => {
            let animation_duration = `swap ${getRandomFloat(8, 15)}s infinite linear`;
            item.querySelectorAll("li").forEach((itemchild) => {
                itemchild.style.animation = animation_duration;
            });
        });
        document.querySelectorAll(".home-wrapper-image-list").forEach((item) => {
            let animation_duration = `swap ${getRandomFloat(2.2, 10)}s infinite linear`;
            item.querySelectorAll("li").forEach((itemchild) => {
                itemchild.style.animation = animation_duration;
            });
        });


        function mapRange(value, fromMin, fromMax, toMin, toMax) {
            // Scale the value from the original range to the new range
            return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
        }
        let throttledUpdate = throttle(updateOnScroll, 10);


        let scroll_distance = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 350
        function updateOnScroll() {

            let top = document.documentElement.scrollTop
            try {
                // 783 -> 433
                // Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) -> ??
                document.getElementById("home-wrapper").style.opacity = mapRange(top, 0, scroll_distance, 1, 0)
                // document.getElementById("home-wrapper").style.opacity = mapRange(top, 0, 433, 1, 0)
            } catch {
                removeEventListener("scroll", throttledUpdate)
            }
        }

        addEventListener("scroll", throttledUpdate);

    }, [])


    const numberOfWrappers = Math.floor(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) / 82.5 * 2.25) + 1;

    const elements = [];
    const elements_types = []
    for (let i = 0; i < numberOfWrappers; i++) {
        if (elements_types.length > 0) {
            if (elements_types.slice(getRandomInt(-3, -2)).every(element => element === 1)) {
                elements.push(
                    <>{wrapper}</>
                );
                elements_types.push(0)
            } else {
                elements.push(
                    <>{wrappertwo}</>
                );
                elements_types.push(1)
            }
        } else {
            if (Math.random() < 0.5) {
                elements.push(
                    <>{wrapper}</>
                );
                elements_types.push(0)
            } else {
                elements.push(
                    <>{wrappertwo}</>
                );
                elements_types.push(1)
            }
        }
    }
    return (
        <>
            <div className="home-wrapper" id="home-wrapper">
                <br/><br/><br/>
                {elements}
            </div>


            <div className="home-content">
                <img src={logo} alt="DOUBLE16"/>
                <h1 id="home-content-subtitle">CODE MARKETPLACE MADE FOR BUYING AND SELLING CODE SNIPPETS</h1>
                <br/><br/>
                <div className="home-content-action">
                    <Link to="/explore">
                        <button className="action">🔎 EXPLORE THE MARKETPLACE</button>
                    </Link>
                    <br className="home-content-break"/>
                    <button className="action" onClick={e => {
                        navigator.clipboard.writeText("https://double16.vercel.app/")
                        e.currentTarget.innerText = "✅ LINK COPIED"
                    }}>🔗 SHARE
                    </button>
                </div>
            </div>
        </>
    )
}