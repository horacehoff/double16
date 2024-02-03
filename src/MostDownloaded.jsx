import "./MostDownloaded.css"
import {useEffect, useState} from "react";
import {getLanguageName, languages_list} from "./lang.jsx";
import {collection, getCountFromServer, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "./firebase.js";
import CodeCard from "./CodeCard.jsx";
import ShortNumber from "short-number";
import CodePagePreview from "./CodePagePreview.jsx";
import {useNavigate} from "react-router-dom";


export default function MostDownloaded() {
    const [pageNumber, setPageNumber] = useState(1)
    const [maxItems, setMaxItems] = useState(10)
    const [language, setLanguage] = useState("Any")
    const [results, setResults] = useState([])
    const navigate = useNavigate()


    const section_items = (data) =>
        <>
            {
                data.length === 0 ? (
                        <>
                            <li>
                                <div className="pg-section-list-placeholder"></div>
                            </li>
                            <li>
                                <div className="pg-section-list-placeholder"></div>
                            </li>
                        </>
                    ) :
                    data.map((codesnippet, index) =>
                        <li key={index} onClick={() => {
                            document.getElementById("lnk").href = "/code/" + codesnippet.id
                            document.getElementById("lnk").onclick = (e) => {
                                e.preventDefault()
                                document.getElementById("root").style.pointerEvents = "all"
                                navigate("/code/" + codesnippet.id)
                            }
                            document.getElementById("aut").href = "/users/" + codesnippet.authorid
                            document.getElementById("aut").onclick = (e) => {
                                e.preventDefault()
                                document.getElementById("root").style.pointerEvents = "all"
                                navigate("/users/" + codesnippet.authorid)
                            }
                        }}>
                            <CodeCard pkg={{
                                lang: getLanguageName(codesnippet.codeLanguage),
                                price: codesnippet.price,
                                like: ShortNumber(codesnippet.likes.length),
                                dislike: ShortNumber(codesnippet.dislikes.length),
                                title: codesnippet.title,
                                author: codesnippet.authorusername,
                                desc: codesnippet.catchphrase,
                                longDesc: codesnippet.desc,
                                char: ShortNumber(codesnippet.char),
                                lines: ShortNumber(codesnippet.lines),
                                banner: codesnippet.bannerUrl,
                                id: codesnippet.id
                            }}
                            />
                        </li>
                    )
            }
        </>


    useEffect(() => {
        countQueryDb(maxItems, language)
    }, [])

    function countQueryDb(max_items, codelanguage) {
        console.log("queried")
        const citiesRef = collection(db, "codesnippets");

        let data_count = 0
        let q = query(citiesRef, orderBy("downloads", "desc"));
        getCountFromServer(q).then((doc) => {
            data_count = doc.data().count
        })
        q = query(q, limit(max_items))
        if (codelanguage !== "Any") {
            q = query(q, where("codeLanguage", '==', codelanguage))
        }
        getDocs(q).then((doc) => {
            setResults([])
            doc.forEach(doc => {
                setResults(prevResults => [...prevResults, doc.data()])
                console.log("iterated")
            })
            console.log(data_count)
            let pages_required = Math.ceil(data_count / max_items)
            setPageNumber(pages_required)
        })
    }

    function processPages() {
        let array = [...Array(pageNumber).keys()]
        array.shift()
        array.push(pageNumber)
        return array
    }

    return (
        <>
            <h1 className="pg-heading md-heading" id="pg-heading">MOST DOWNLOADED</h1>
            <h2 className="pg-subtitle">EXPLORE THE MOST DOWNLOADED CODE SNIPPETS</h2>
            <div className="pg-subsection">
                <select>
                    {
                        processPages().map((item, index) =>
                            (
                                <option key={index}>PAGE. {item}</option>
                            )
                        )
                    }
                </select>
                <select onChange={e => {
                    setMaxItems(e.target.value)
                    countQueryDb(e.target.value, language)
                }} value={maxItems}>
                    <option key={10} value={10}>10 RESULTS</option>
                    <option key={15} value={15}>15 RESULTS</option>
                    <option key={20} value={20}>20 RESULTS</option>
                    <option key={25} value={25}>25 RESULTS</option>
                </select>
                <select value={language}
                        onChange={e => {
                            setLanguage(e.target.value)
                            countQueryDb(maxItems, e.target.value)
                        }}>
                    <option>Any</option>
                    {languages_list.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <ul className="pg-section-list" id="pg-section-list">
                {section_items(results)}
            </ul>
            <CodePagePreview/>
        </>
    )
}