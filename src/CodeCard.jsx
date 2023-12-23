import "./CodeCard.css"
import ReactDOMServer from 'react-dom/server';
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CodeCard({pkg}) {
    return (
        <>
            <Link id="test" to="/" onClick={e => e.preventDefault()}>
                <div className="codecontainer" onClick={() => {
                    // set values
                    document.getElementById("lng").innerHTML = ReactDOMServer.renderToStaticMarkup(pkg.lang)
                    document.getElementById("prc").innerHTML = pkg.price
                    document.getElementById("lk").innerHTML = pkg.like
                    document.getElementById("dlk").innerHTML = pkg.dislike
                    document.getElementById("ttl").innerHTML = pkg.title
                    document.getElementById("aut").innerHTML = pkg.author
                    document.getElementById("dc").innerHTML = pkg.longDesc
                    document.getElementById("ch").innerHTML = pkg.char
                    document.getElementById("bnr").src = pkg.banner


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
                    <p className="leftgroup">{pkg.lang} 💵{pkg.price}€</p>
                    <p className="rightgroup">👍{pkg.like}</p>
                    <h4>{pkg.title}</h4>
                    <h5>by <span>{pkg.author}</span></h5>
                    <p className="desc">{pkg.desc}</p>
                    <p className="linecount">{pkg.char} characters - {pkg.lines} lines</p>
                </div>
            </Link>

        </>
    )
}