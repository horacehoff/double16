import "./Search.css"
import {ClosePreview} from "./CodePagePreview.jsx";
import {useId} from "react";
import {languages_list} from "./lang.jsx";

export default function Search() {
    const ratepopup = useId()
    return (<>
        <h1 className="pg-heading" id="pg-heading">SEARCH</h1>
        <h2 className="pg-subtitle">SEARCH AND FIND THE EXACT CODE SNIPPET YOU NEED</h2>
        <div className="srch-cont">
            <input placeholder="@search_query" type="text"/>
            <br/>
            <button className="accent srch-flt" onClick={() => {
                document.getElementById("root").style.pointerEvents = "none"
                document.getElementById("root").style.touchAction = "none"
                document.getElementById(ratepopup).style.pointerEvents = "all"
                document.getElementById(ratepopup).style.touchAction = "auto"
                document.getElementById(ratepopup).style.display = "block"
                setTimeout(() => {
                    document.getElementById(ratepopup).style.opacity = "1"
                }, 1)
                let childdiv = document.getElementById(ratepopup).children[0]
                setTimeout(() => {
                    childdiv.style.marginTop = "0"
                }, 1)
            }}><span className="emojifix">⚙️</span>️ FILTERS
            </button>
            <br/>
            <button className="primary srch-btn">SEARCH <span className="emojifix">🔎</span></button>
        </div>
        <div className="codepgpre-bg" id={ratepopup} onClick={e => {
            if (e.target === e.currentTarget) {
                ClosePreview(ratepopup)
            }
        }}>
            <div className="codepg-ratepop srch-flt-pg">
                <h4><span className="emojifix">⚙️</span>️ FILTERS</h4>
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={() => ClosePreview(ratepopup)}>
                    <g clipPath="url(#clip0_489_191299)">
                        <path d="M5 5l14 14m0-14L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_489_191299">
                            <path fill="currentColor" d="M0 0H24V24H0z"/>
                        </clipPath>
                    </defs>
                </svg>
                <p>--- AUTHOR ---</p>
                <input placeholder="@author" type="text"/>
                <p>--- DOWNLOADS ---</p>
                <select>
                    <option>MORE</option>
                    <option>LESS</option>
                </select>
                <input placeholder="@author" type="text"/>
                <p>--- PROGRAMMING LANGUAGE ---</p>
                <select>
                    <option>Any</option>
                    {languages_list.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </>);
}