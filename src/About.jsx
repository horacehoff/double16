import "./About.css"
import banner from "./assets/navlogo.svg"

export default function About() {
    return (
        <>
            <div className="about-cnt">
                <img src={banner} alt="DOUBLE16 Banner"/>
                <p>Made on Earth by humans<br/>Created by <a className="action-text"
                                                             href="https://linktr.ee/just_a_mango"
                                                             target="_blank"
                                                             rel="noreferrer">@just_a_mango</a> (alias <a
                    className="action-text" href="https://www.linkedin.com/in/horace-hoff" target="_blank"
                    rel="noreferrer">Horace
                    Hoff</a>)
                </p>
                <br/>
                <h4>CREDITS</h4>
                <ul className="about-credits-list">
                    <li>
                        <span className="emojifix">❤</span> Many thanks to JetBrains for their awesome font <strong><a
                        href="https://www.jetbrains.com/lp/mono" target="_blank" rel="noreferrer"
                        className="action-text about-undr">JetBrains Mono</a></strong>
                    </li>
                    <li>---</li>
                    <li>
                        <span className="emojifix">❤</span> Much appreciation also to Adobe for <strong><a
                        href="https://github.com/adobe-fonts/source-code-pro" target="_blank" rel="noreferrer"
                        className="action-text about-undr">Source Code Pro</a></strong>
                    </li>
                    <li>---</li>
                    <li>
                        <span>🫶</span>I would also like to thank:<br/>
                        <ul>
                            <li>
                                cfj - <a href="https://www.npmjs.com/package/short-number"
                                         target="_blank" rel="noreferrer"
                                         className="action-text about-undr">short-number</a>
                            </li>
                            <li>
                                Robert Kieffer / ctavan - <a href="https://www.npmjs.com/package/uuid"
                                                             target="_blank" rel="noreferrer"
                                                             className="action-text about-undr">uuid</a>
                            </li>
                            <li>
                                Evan Vosberg - <a href="https://www.npmjs.com/package/crypto-js"
                                                  target="_blank" rel="noreferrer"
                                                  className="action-text about-undr">crypto-js</a>
                            </li>
                            <li>
                                pieroxy - <a href="https://www.npmjs.com/package/lz-string"
                                             target="_blank" rel="noreferrer"
                                             className="action-text about-undr">lz-string</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}