import "./CodePage.css"
import {rust} from "./lang.jsx";
import {useId, useState} from "react";
import {ClosePreview} from "./CodePagePreview.jsx";

export default function CodePage() {
    const favoritebtn = useId()
    const [isFavorite, setIsFavorite] = useState(false)

    const ratepopup = useId()
    return (
        <>
            <div className="codepgpre codepg">
                <img
                    src="https://www.codingcreativo.it/wp-content/uploads/2022/10/fibonacci-sequence-in-python.jpg"
                    alt="Banner" className="codepg-img"/>
                <div className="codepg-btngp">
                    <button className="primary">🛒 BUY FOR 5$</button>
                    <button className="primary" onClick={() => {
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
                    }}>⭐️ RATE
                    </button>
                    <button className="primary " id={favoritebtn} onClick={() => {
                        if (!isFavorite) {
                            document.getElementById(favoritebtn).style.color = "transparent"
                            setTimeout(() => {
                                document.getElementById(favoritebtn).innerHTML = document.getElementById(favoritebtn).innerHTML.replace("FAVORITE", "UN-FAVORITE")
                                document.getElementById(favoritebtn).style.color = null
                                document.getElementById(favoritebtn).firstChild.style.color = "white"
                            }, 250)
                            setIsFavorite(true)
                        } else {
                            document.getElementById(favoritebtn).style.color = "transparent"
                            setTimeout(() => {
                                document.getElementById(favoritebtn).innerHTML = document.getElementById(favoritebtn).innerHTML.replace("UN-FAVORITE", "FAVORITE")
                                document.getElementById(favoritebtn).style.color = null
                                document.getElementById(favoritebtn).firstChild.style.color = "white"
                            }, 250)
                            setIsFavorite(false)
                        }
                    }}><span className="emojifix">❤️</span>️ FAVORITE
                    </button>
                </div>
                <h2 className="codepgpre-title">FIBONACCI SEQUENCE CALCULATOR</h2>
                <h3 className="codepgpre-info">💵 5$ <span className="codepgpre-infosep">-</span> {rust} <span
                    className="codepgpre-infosep">-</span> 👍 1K <span className="codepgpre-infosep">-</span> 👎
                    5K <span className="codepgpre-infosep">-</span> 150000 char.</h3>
                <h3 className="codepgpre-info codepg-update">⏰ UPDATED 2H AGO</h3>
                <h4 className="codepgpre-author">by <span>JuTS-A_MANGO</span></h4>
                <p className="codepgpre-desc">trm-engine is a game engine designed to run in the terminal, providing
                    a simple and lightweight platform for developing terminal-based games.
                    Key Features:
                    Object Management: The engine includes an object management system, allowing for easy creation,
                    manipulation, and movement of game objects within the terminal window.
                    Size/Performance: The engine offers good performance with a very small bundled size, making it
                    accessible to a wide variety of people and platforms.
                    trm-engine provides a simple and flexible platform for creating games in the terminal, making it
                    ideal for hobbyist game developers or those looking to learn game development concepts in a
                    lightweight and accessible manner.</p>
            </div>
            <div className="codepgpre-bg" id={ratepopup} onClick={e => {
                if (e.target === e.currentTarget) {
                    ClosePreview(ratepopup)
                }
            }}>
                <div className="codepg-ratepop">
                    <h3>RATE</h3>
                    <button className="primary" onClick={() => {
                        // like method
                        ClosePreview(ratepopup)
                    }}>👍 LIKE
                    </button>
                    <button className="primary" onClick={() => {
                        // dislike method
                        ClosePreview(ratepopup)
                    }}>👎 DISLIKE
                    </button>
                </div>
            </div>
        </>
    )
}