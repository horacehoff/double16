import "./Search.css"
import {ClosePreview} from "./CodePagePreview.jsx";
import {useId} from "react";
import {languages} from "./lang.jsx";

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
                    {languages.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </>)
}