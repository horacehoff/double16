import "./CodePagePreview.css"
import {Link} from "react-router-dom";
import {cpp} from "./lang.jsx";

export default function CodePagePreview() {
    const ClosePreview = () => {
        document.getElementById("codepgpre").style.opacity = "0"
        setTimeout(() => {
            document.getElementById("codepgpre").style.display = "none"
            setTimeout(() => {
                document.getElementById("codepgpre").children[0].style.marginTop = "10px"
                document.getElementById("root").style.pointerEvents = "all"
                document.getElementById("root").style.touchAction = "auto"
                document.getElementById("codepgpre").style.pointerEvents = "none"
                document.getElementById("codepgpre").style.touchAction = "none"
            })
        }, 100)
    }
    return (
        <>
            <div className="codepgpre-bg" id="codepgpre" onClick={e => {
                if (e.target === e.currentTarget) {
                    ClosePreview()
                }
            }}>
                <div className="codepgpre">
                    <p className="codepgpre-close" onClick={() => ClosePreview()}>{"CLOSE"}</p>
                    <Link className="codepgpre-link action-text" to="/"
                          onClick={() => document.getElementById("root").style.pointerEvents = "all"}>VIEW MORE</Link>
                    <br/>
                    <img
                        src="https://img.freepik.com/premium-photo/light-background-texture-room-photography-studio-shade-yellow-high-quality-photo_163305-227313.jpg"
                        alt="Banner"/>
                    <h2 className="codepgpre-title">FIBONACCI SEQUENCE CALCULATOR</h2>
                    <h3 className="codepgpre-info">💵 5$ <span className="codepgpre-infosep">-</span> {cpp} <span
                        className="codepgpre-infosep">-</span> 👍 1K <span className="codepgpre-infosep">-</span> 👎
                        5K <span className="codepgpre-infosep">-</span> 150000 char.</h3>
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
            </div>
        </>
    )
}