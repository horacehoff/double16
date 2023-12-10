import "./CodeCard.css"

export default function CodeCard({lang, price, like, title, author, desc, char, lines}) {
    return (
        <>
            <div className="codecontainer">
                <p className="leftgroup">{lang} 💵{price}€</p>
                <p className="rightgroup">👍{like}</p>
                <h4>{title}</h4>
                <h5>by <span>{author}</span></h5>
                <p className="desc">{desc}</p>
                <p className="linecount">{char} characters - {lines} lines</p>
            </div>
        </>
    )
}