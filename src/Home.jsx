import "./Home.css"
import logo from "./assets/navlogo.svg"
import {useEffect} from "react";
import throttle from 'lodash.throttle'
import {Link} from "react-router-dom";

export default function Home() {

    const wrapper = <>
        <img src={logo} alt="DOUBLE16"/>
        <img src={logo} alt="DOUBLE16"/>
        <img src={logo} alt="DOUBLE16"/>
        <img src={logo} alt="DOUBLE16"/>
        <img src={logo} alt="DOUBLE16"/>
        <img src={logo} alt="DOUBLE16"/>
        <img src={logo} alt="DOUBLE16"/>
        <img src={logo} alt="DOUBLE16"/>
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


        // console.log(document.getElementById("home-content-subtitle").offsetTop)
        // let topoff = document.getElementById("home-content-subtitle").offsetTop
        // let subtitle_size = 0
        // if (matchMedia("(max-width: 600px)").matches) {
        //     subtitle_size = mapRange(topoff, 300, 500, 1, 5)
        //     if (subtitle_size <= 5) {
        //         document.getElementById("home-content-subtitle").style.fontSize = subtitle_size + "vw"
        //     }
        // } else {
        //     subtitle_size = mapRange(topoff, 300, 500, 1, 2.6)
        //     if (subtitle_size <= 2.6) {
        //         document.getElementById("home-content-subtitle").style.fontSize = subtitle_size + "vw"
        //     }
        // }


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
                    scrollPosition = (scrollPosition + scrollSpeed) % contentWidth;
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


        const throttledUpdate = throttle(updateOnScroll, 50);

        function updateOnScroll() {

            let top = document.documentElement.scrollTop
            try {
                document.getElementById("home-wrapper").style.opacity = mapRange(top, 0, 433, 1, 0)
            } catch {
                removeEventListener("scroll", throttledUpdate)
            }

            // let subtitle_size = 0
            // if (matchMedia("(max-width: 600px)").matches) {
            //     subtitle_size = mapRange(top, 300, 500, 1, 5)
            //     if (subtitle_size <= 5) {
            //         document.getElementById("home-content-subtitle").style.fontSize = subtitle_size + "vw"
            //     }
            // } else {
            //     subtitle_size = mapRange(top, 300, 500, 1, 2.6)
            //     if (subtitle_size <= 2.6) {
            //         document.getElementById("home-content-subtitle").style.fontSize = subtitle_size + "vw"
            //     }
            // }
        }
        addEventListener("scroll", throttledUpdate);

    }, [])


    return (
        <>
            <div className="home-wrapper" id="home-wrapper">
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
                <div className="home-wrapper-bg-slide">{wrappertwo}</div>
                <div className="home-wrapper-bg-slide">{wrapper}</div>
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