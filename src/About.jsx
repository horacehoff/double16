import "./About.css"
import banner from "./assets/navlogo.svg"
import {Helmet} from "react-helmet";

export default function About() {
    return (
        <>
            <Helmet>
                <title>Double16 | About</title>
                <meta content="Double16 | About"
                      name="title"/>
                <meta content="Made on Earth by humans - Created by Horace Hoff"
                      name="description"/>

                <meta content="https://www.double16.tech/about" property="og:url"/>
                <meta content="Double16 | About" property="og:title"/>
                <meta content="Made on Earth by humans - Created by Horace Hoff"
                      property="og:description"/>

                <meta content="https://www.double16.tech/about" property="twitter:url"/>
                <meta content="Double16 | About" property="twitter:title"/>
                <meta content="Made on Earth by humans - Created by Horace Hoff"
                      property="twitter:description"/>
            </Helmet>
            <div className="about-cnt">
                <img src={banner} alt="Double16 Banner"/>
                <p>Made on Earth by humans<br/>Created by <a className="action-text"
                                                             href="https://just-a-mango.github.io"
                                                             target="_blank"
                                                             rel="noreferrer">@just_a_mango</a> (<a
                    className="action-text" href="https://www.linkedin.com/in/horace-hoff" target="_blank"
                    rel="noreferrer">LinkedIn</a>)
                </p>
                <p style={{position: "relative", marginTop: "-15px"}}>Last updated: May 25th, 2024</p>
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
                        <span>🫶</span> I would also like to thank:<br/>
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
                            <li>
                                SPDX - <a href="https://github.com/spdx/license-list-data"
                                          target="_blank" rel="noreferrer"
                                          className="action-text about-undr">license-list-data</a>
                            </li>
                            <li>
                                IBM - <a href="https://github.com/IBM/plex"
                                         target="_blank" rel="noreferrer"
                                         className="action-text about-undr">Plex Mono</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}