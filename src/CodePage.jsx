import "./CodePage.css"
import {rust} from "./lang.jsx";

export default function CodePage() {
    return (
        <>
            <div className="codepgpre codepg">
                <img
                    src="https://img.freepik.com/premium-photo/light-background-texture-room-photography-studio-shade-yellow-high-quality-photo_163305-227313.jpg"
                    alt="Banner" className="codepg-img"/>
                <div className="codepg-btngp">
                    <button className="primary">🛒 BUY FOR 5$</button>
                    <button className="primary">⭐️ RATE</button>
                    <button className="primary"><span className="emojifix">❤️</span>️ FAVORITE</button>
                </div>
                <h2 className="codepgpre-title">FIBONACCI SEQUENCE CALCULATOR</h2>
                <h3 className="codepgpre-info">💵 5$ <span className="codepgpre-infosep">-</span> {rust} <span
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
        </>
    )
}