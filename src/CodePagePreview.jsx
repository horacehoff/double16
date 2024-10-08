import "./CodePagePreview.css"
import {Link} from "react-router-dom";


export function ClosePreview(id) {
    document.getElementById(id).style.opacity = "0"
    setTimeout(() => {
        document.getElementById(id).children[0].scrollTop = 0
        document.getElementById(id).style.display = "none"
        try {
            document.getElementById("bnrlzy").style.display = "none"
            document.getElementById("bnr").style.display = "block"
        } catch {
        }
        setTimeout(() => {
            document.getElementById(id).children[0].style.marginTop = "10px"
            document.getElementById("root").style.pointerEvents = "all"
            document.getElementById("root").style.touchAction = "auto"
            document.getElementById(id).style.pointerEvents = "none"
            document.getElementById(id).style.touchAction = "none"
        })
    }, 100)
}

export default function CodePagePreview() {
    const lang = "lng"
    const price = "prc"
    const likes = "lk"
    const dislikes = "dlk"
    const downloads = "dwn"
    const title = "ttl"
    const author = "aut"
    const desc = "dc"
    const char = "ch"
    const banner = "bnr"
    const link = "lnk"

    const image_loading_id = "bnrlzy"


    function rendered() {
        //Render complete
        document.getElementById(image_loading_id).style.display = "none"
        document.getElementById(banner).style.display = "block"
    }

    function startRender() {
        //Rendering start
        requestAnimationFrame(rendered);
    }

    function loaded() {
        requestAnimationFrame(startRender);
    }
    return (
        <>
            <div className="codepgpre-bg" id="codepgpre" onClick={e => {
                if (e.target === e.currentTarget) {
                    ClosePreview("codepgpre")
                }
            }}>
                <div className="codepgpre">
                    <p className="codepgpre-close" onClick={() => ClosePreview("codepgpre")}>CLOSE</p>
                    <Link id={link} className="codepgpre-link action-text" to="/code"
                          onClick={() => document.getElementById("root").style.pointerEvents = "all"}>
                        VIEW MORE
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_489_191280)">
                                <g clipPath="url(#clip1_489_191280)" stroke="currentColor" strokeWidth="2"
                                   strokeLinecap="round" strokeLinejoin="round">
                                    <path
                                        d="M9 20l5.172-5.172c1.333-1.333 2-2 2-2.828 0-.828-.667-1.495-2-2.828L9 4"></path>
                                    <path
                                        d="M9 20l5.172-5.172c1.333-1.333 2-2 2-2.828 0-.828-.667-1.495-2-2.828L9 4"></path>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_489_191280">
                                    <path fill="currentColor" d="M0 0H24V24H0z"></path>
                                </clipPath>
                                <clipPath id="clip1_489_191280">
                                    <path fill="currentColor" transform="rotate(90 12 12)" d="M0 0H24V24H0z"></path>
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>
                    <br/>
                    <div className="codepgpre-imgph" id={image_loading_id}/>
                    <img
                        src="https://img.freepik.com/premium-photo/light-background-texture-room-photography-studio-shade-yellow-high-quality-photo_163305-227313.jpg"
                        id={banner}
                        alt="Banner"
                        onLoad={() => {
                            loaded()
                        }}
                        style={{display: "none"}}
                    />
                    <h2 className="codepgpre-title" id={title}>FIBONACCI SEQUENCE CALCULATOR</h2>
                    <h3 className="codepgpre-info"><span id={downloads}></span>
                        <svg className="codepgpre-dwn" width="20px" height="20px" strokeWidth="2" viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg" color="#fff">
                            <path d="M6 20L18 20" stroke="#Dadada" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                            <path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="#Dadada" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span
                            className="codepgpre-infosep">-</span> <span id={lang}>{}</span> <span
                            className="codepgpre-infosep">-</span> 👍 <span id={likes}>1K</span> <span
                            className="codepgpre-infosep">-</span> 👎 <span id={dislikes}>5K</span> <span
                            className="codepgpre-infosep">-</span> <span id={char}>150000</span> char.
                    </h3>
                    <h4 className="codepgpre-author">by <Link to="/user" id={author}
                                                              className="link-text">JuTS-A_MANGO</Link></h4>
                    <p className="codepgpre-desc" id={desc}>trm-engine is a game engine designed to run in the terminal,
                        providing
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