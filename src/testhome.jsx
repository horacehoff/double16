import "./testhome.css"
import logo from "./assets/navlogo.svg"
import {useEffect} from "react";

export default function TestHome() {

    const wrapper = <>
        <img src={logo}/>
        <img src={logo}/>
        <img src={logo}/>
        <img src={logo}/>
        <img src={logo}/>
        <img src={logo}/>
        <img src={logo}/>
        <img src={logo}/>
    </>

    const wrappertwo = <>
        <p>CODE.BUY.SELL.</p>
        <p>CODE.BUY.SELL.</p>
        <p>CODE.BUY.SELL.</p>
        <p>CODE.BUY.SELL.</p>
        <p>CODE.BUY.SELL.</p>
        <p>CODE.BUY.SELL.</p>
        <p>CODE.BUY.SELL.</p>
        <p>CODE.BUY.SELL.</p>
    </>

    useEffect(() => {
        // document.querySelector(".nav").style.display = "none"
        document.querySelector(".nav").style.opacity = 0
        document.querySelector(".nav").style.backgroundColor = "var(--color-flip)"
        setTimeout(() => {
            document.querySelector(".nav").style.opacity = 1
        }, 1000)


        function randomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }

        function infiniteHorizontalScrolling() {
            document.querySelectorAll(".home-wrapper-bg-slide").forEach((elem) => {
                const scrollSpeed = randomFloat(0.1, 0.5); // Adjust scrolling speed as needed
                const contentWidth = elem.scrollWidth;

                // Clone the contents to the right side
                const clonedContents = elem.innerHTML;
                elem.innerHTML += clonedContents;

                let scrollPosition = 0;

                function scroll() {
                    scrollPosition += scrollSpeed;
                    if (scrollPosition >= contentWidth) {
                        scrollPosition = 0;
                    }
                    elem.scrollLeft = scrollPosition;
                    requestAnimationFrame(scroll);
                }

                scroll();
            })
        }

        infiniteHorizontalScrolling();


        function mapRange(value, fromMin, fromMax, toMin, toMax) {
            // Scale the value from the original range to the new range
            return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
        }


        addEventListener("scroll", e => {
            document.getElementById("home-wrapper").style.opacity = mapRange(document.documentElement.scrollTop, 0, 433, 1, 0)
            console.log(document.documentElement.scrollTop)

            let subtitle_size = 0
            if (matchMedia("(max-width: 600px)").matches) {
                subtitle_size = mapRange(document.documentElement.scrollTop, 300, 500, 1, 5)
                if (subtitle_size <= 5) {
                    document.getElementById("home-content-subtitle").style.fontSize = subtitle_size + "vw"
                }
            } else {
                subtitle_size = mapRange(document.documentElement.scrollTop, 300, 500, 1, 2.6)
                if (subtitle_size <= 2.6) {
                    document.getElementById("home-content-subtitle").style.fontSize = subtitle_size + "vw"
                }
            }

        })

    }, [])
    return (
        <>
            <div className="home-wrapper" id="home-wrapper">
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide" id="scrollingDiv">{wrapper}</div>
            </div>


            <div className="home-content">
                <img src={logo}/>
                <h1 id="home-content-subtitle">CODE MARKETPLACE MADE FOR BUYING AND SELLING CODE SNIPPETS</h1>
                <br/><br/>
                <div className="home-content-action">
                    <button className="action">🔎 EXPLORE THE MARKETPLACE</button>
                    <button className="action">🔗 SHARE</button>
                </div>
            </div>
        </>
    )
}