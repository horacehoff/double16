import "./Sell.css"
import {useEffect, useId} from "react";
import {languages_list} from "./lang.jsx";

export default function Sell() {
    const sellcont = useId()

    const nameid = useId()
    const catchphraseid = useId()
    const bannerid = useId()

    const descid = useId()

    const languageid = useId()
    const codeid = useId()


    // function pxpercent() {
    //     let div = document.createElement('div');
    //     div.style.width = '100%';
    //     document.body.appendChild(div);
    //     let width  = div.clientWidth;
    //     document.body.removeChild(div);
    //     return width;
    // }
    function pxpercent() {
        // Create a clone of the body style to avoid affecting the actual body style
        let bodyStyle = document.body.style.cssText;

        // Set the body style to 100% width temporarily
        document.body.style.width = '100%';

        // Get the client width of the body
        let width = document.body.clientWidth;

        // Restore the original body style
        document.body.style.cssText = bodyStyle;

        // Return the width
        return width;
    }

    useEffect(() => {
        let width = window.innerWidth
        window.addEventListener("resize", () => {
            if (document.getElementById(sellcont).scrollLeft > 0 && window.innerWidth > width) {
                document.getElementById(sellcont).scrollLeft = pxpercent() * Math.round(document.getElementById(sellcont).scrollLeft / width)
            } else if (document.getElementById(sellcont).scrollLeft > 0 && window.innerWidth < width && Math.round(document.getElementById(sellcont).scrollLeft / width) === 1) {
                document.getElementById(sellcont).scrollLeft = pxpercent()
            }
            width = window.innerWidth;
        })
    }, []);


    const gofwd = () => {
        document.getElementById(sellcont).scroll({
            left: document.getElementById(sellcont).scrollLeft + pxpercent(),
            behavior: "smooth"
        })
    }
    const gobkwd = () => {
        document.getElementById(sellcont).scroll({
            left: document.getElementById(sellcont).scrollLeft - pxpercent(),
            behavior: "smooth"
        })
    }


    return (
        <>
            <h1 className="pg-heading" id="pg-heading">SELL</h1>
            <h2 className="pg-subtitle">PUBLISH YOUR OWN CODE SNIPPET</h2>
            <ul className="sell-cont" id={sellcont}>
                <li className="sell-cont-part">
                    <div>
                        <label className="sell-cont-label-txt" htmlFor={nameid}>
                            <h3>NAME</h3>
                            <h4>A good, and preferably short name for your code snippet</h4>
                        </label>
                        <input type="text" placeholder="@awesome_name" id={nameid}/>
                        <br/><br/>
                        <label className="sell-cont-label-txt" htmlFor={catchphraseid}>
                            <h3>CATCHPHRASE</h3>
                            <h4>A quick, short, and concise description for your code snippet</h4>
                        </label>
                        <input type="text" placeholder="@good_catchphrase" id={catchphraseid}/>
                        <br/><br/>
                        <label className="sell-cont-label-txt sell-cont-label-txt-banner" htmlFor={bannerid}>
                            <h3>BANNER</h3>
                            <h4>Upload the banner of your code snippet</h4>
                        </label>
                        <label className="sell-cont-banner-upload" htmlFor={bannerid}>
                            <input type="file" id={bannerid}/>
                            <svg fill="none" viewBox="0 0 24 24" width="1.2em" height="1.2em"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                                    <path
                                        d="M18 9.222c1.657 0 3 1.393 3 3.111A3.134 3.134 0 0 1 19.546 15M18 9.222C19.2 5.667 16.2 3 12.9 3S7.05 5.667 7.5 7.667M18 9.222c-.67 0-1.29.229-1.79.615a3.025 3.025 0 0 0-.46.438M10.188 10a3.933 3.933 0 0 0-.32-.606C9.195 8.353 8.05 7.667 6.75 7.667 4.679 7.667 3 9.407 3 11.556c0 1.407.72 2.64 1.8 3.322"/>
                                    <path d="M12 22v-7.5m0 0l-3 3m3-3l3 3" strokeLinejoin="round"/>
                                </g>
                            </svg>
                            UPLOAD BANNER
                        </label>
                        <br/><br/><br/>
                        <button className="primary sell-cont-nav-btn" onClick={gofwd}>DESCRIPTION 👉
                        </button>
                    </div>
                </li>
                <li className="sell-cont-part sell-cont-part-desc">
                    <div>
                        <label className="sell-cont-label-txt" htmlFor={descid}>
                            <h3>DESCRIPTION</h3>
                            <h4>A longer, more precise description for your code snippet</h4>
                        </label>
                        {/*<textarea placeholder="@great_description" id={descid}/>*/}
                        {/*<div className="sell-cont-mdeditor">*/}
                        {/*<MarkdownEditor value="Hello Markdown!" />*/}
                        <textarea placeholder="@great_description" id={descid} className="sell-cont-mdeditor"/>
                        {/*</div>*/}
                        <br/>
                        <button className="primary sell-cont-nav-btn" onClick={gobkwd}>👈 GENERAL INFO
                        </button>
                        <button className="primary sell-cont-nav-btn" onClick={gofwd}>CODE 👉
                        </button>
                    </div>
                </li>
                <li className="sell-cont-part">
                    <div>
                        <label className="sell-cont-label-txt" htmlFor={languageid}>
                            <h3>LANGUAGE</h3>
                            <h4>The language of the code below</h4>
                        </label>
                        <select id={languageid}>
                            {languages_list.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <br/><br/>
                        <label className="sell-cont-label-txt" htmlFor={codeid}>
                            <h3>CODE</h3>
                            <h4>The final code that users will download</h4>
                        </label>
                        <textarea className="sell-cont-code" id={codeid}></textarea>
                        <br/><br/>
                        <button className="accent sell-cont-nav-btn" onClick={gobkwd}>👈 DESCRIPTION</button>
                        <br/>
                        <button className="primary sell-cont-nav-btn sell-cont-code-publish" onClick={e => {
                            console.log("PUBLISHED")
                            e.currentTarget.innerHTML = "PUBLISHED 🎉"
                        }}>PUBLISH
                        </button>
                    </div>
                </li>
            </ul>
        </>
    )
}