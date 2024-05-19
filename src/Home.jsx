import "./Home.css"
import logo from "./assets/navlogo.svg"
import {useEffect} from "react";
import throttle from 'lodash.throttle'
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";


export default function Home() {
    const wrapper = <>
        <ul>
            {[...Array(Math.floor(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 150))].map((_, index) => (
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
                        <img src={logo} alt="Double16"/>
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


        let scroll_distance = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 433 / 783

        function updateOnScroll() {

            let top = document.documentElement.scrollTop
            try {
                let opacityRange = mapRange(top, 0, scroll_distance, 1, 0)
                document.getElementById("home-wrapper").style.opacity = opacityRange
                document.getElementById("home-arrow").style.opacity = opacityRange
                document.getElementById("home-arrow-shadow").style.opacity = opacityRange
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
            <Helmet>
                <title>Double16</title>
                <meta content="Double16"
                      name="title"/>
                <meta content="Discover, share, download and sell code snippets on Double16."
                      name="description"/>

                <meta content="https://www.double16.tech/" property="og:url"/>
                <meta content="Double16" property="og:title"/>
                <meta content="Discover, share, download and sell code snippets on Double16."
                      property="og:description"/>

                <meta content="https://www.double16.tech/" property="twitter:url"/>
                <meta content="Double16" property="twitter:title"/>
                <meta content="Discover, share, download and sell code snippets on Double16."
                      property="twitter:description"/>
            </Helmet>
            <div className="home-wrapper" id="home-wrapper">
                <br/><br/><br/>
                {elements}
            </div>

            <svg className="home-arrow" id="home-arrow" width="35px" height="35px" viewBox="0 0 24 24" strokeWidth="2"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg" color="white">
                <path d="M6 13L12 19L18 13" stroke="white" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"></path>
                <path d="M6 5L12 11L18 5" stroke="white" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"></path>
            </svg>
            <div className="home-arrow-shadow" id="home-arrow-shadow"></div>


            <div className="home-content">
                <h1><img src={logo} alt="Double16"/></h1>
                <h2 id="home-content-subtitle">Code marketplace made for buying and selling code snippets</h2>
                <br/><br/>
                <div className="home-content-action">
                    <Link to="/explore">
                        <button className="action">🔎 Explore the marketplace</button>
                    </Link>
                    <br className="home-content-break"/>
                    <button className="action" onClick={e => {
                        navigator.clipboard.writeText("https://www.double16.tech/")
                        e.currentTarget.innerText = "✅ LINK COPIED"
                    }}>🔗 Share
                    </button>
                </div>
            </div>
        </>
    )
}