import "./CodeCard.css"
import ReactDOMServer from 'react-dom/server';
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CodeCard({pkg}) {
    return (
        <>
            <Link id="test" to={"/code/" + pkg.id} onClick={e => e.preventDefault()}>
                <div className="codecontainer" onClick={() => {
                    // set values
                    document.getElementById("lng").innerHTML = ReactDOMServer.renderToStaticMarkup(pkg.lang)
                    // document.getElementById("prc").innerHTML = pkg.price
                    document.getElementById("lk").innerHTML = pkg.likes
                    document.getElementById("dlk").innerHTML = pkg.dislike
                    document.getElementById("dwn").innerHTML = pkg.downloads
                    document.getElementById("ttl").innerHTML = pkg.title
                    document.getElementById("aut").innerHTML = pkg.author
                    document.getElementById("dc").innerHTML = pkg.longDesc
                    document.getElementById("ch").innerHTML = pkg.char
                    if (document.getElementById("bnr").src !== pkg.banner) {
                        document.getElementById("bnr").src = null
                        document.getElementById("bnr").src = pkg.banner
                    }

                    // style
                    document.getElementById("root").style.pointerEvents = "none"
                    document.getElementById("root").style.touchAction = "none"
                    document.getElementById("codepgpre").style.pointerEvents = "all"
                    document.getElementById("codepgpre").style.touchAction = "auto"
                    document.getElementById("codepgpre").style.display = "block"
                    setTimeout(() => {
                        document.getElementById("codepgpre").style.opacity = "1"
                    }, 1)
                    let childdiv = document.getElementById("codepgpre").children[0]
                    setTimeout(() => {
                        childdiv.style.marginTop = "0"
                    }, 1)
                }}>
                    {/*<p className="leftgroup">{pkg.lang} 💵{pkg.price}€</p>*/}
                    <p className="leftgroup">{pkg.lang}</p>
                    {/*<p className="rightgroup">👍{pkg.like}</p>*/}
                    {/*<p className="rightgroup"><span style={{position: "relative", right: "2px"}}>👍</span>{pkg.like}</p>*/}
                    <p className="rightgroup downloads"><span>{pkg.downloads}</span>
                        <svg width="20px" height="20px" strokeWidth="2" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" color="#fff">
                            <path d="M6 20L18 20" stroke="#Dadada" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                            <path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="#Dadada" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </p>
                    <h4>{pkg.title}</h4>
                    <h5>by <span>{pkg.author}</span></h5>
                    <p className="desc">{pkg.desc}</p>
                    <p className="linecount">{pkg.char} characters - {pkg.lines} lines</p>
                </div>
            </Link>

        </>
    )
}