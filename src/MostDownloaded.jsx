import "./MostDownloaded.css"
import {useEffect, useState} from "react";
import {getLanguageName, languages_list} from "./lang.jsx";
import {collection, getCountFromServer, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import {db} from "./firebase.js";
import CodeCard from "./CodeCard.jsx";
import ShortNumber from "short-number";
import CodePagePreview from "./CodePagePreview.jsx";
import {useNavigate} from "react-router-dom";


export default function MostDownloaded() {
    const [pageNumber, setPageNumber] = useState(1)
    const [maxItems, setMaxItems] = useState(10)
    const [language, setLanguage] = useState("Any")
    const [results, setResults] = useState({
        1: []
    })
    const [lastResult, setLastResult] = useState({
        1: null
    })
    const [page, setPage] = useState(1)
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
        countQueryDb(maxItems, language, page)
    }, [])

    function countQueryDb(max_items, codelanguage, page, reset = false) {
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
            if (reset) {
                setResults({})
            }
            let push_results = []
            let i = 0;
            doc.forEach(doc => {
                push_results.push(doc.data())
                i++
                if (i === max_items) {
                    let new_last_results = lastResult
                    new_last_results[page] = doc
                    setLastResult({...new_last_results})
                }
            })
            console.log(lastResult)
            if (data_count !== 0) {
                let pages_required = Math.ceil(data_count / max_items)
                setPageNumber(pages_required)
            } else {
                setTimeout(() => {
                    let pages_required = Math.ceil(data_count / max_items)
                    setPageNumber(pages_required)
                }, 100)
            }
            let new_results = results
            new_results[page] = push_results
            setResults({...new_results})
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
                <select value={page} onChange={e => {
                    if (!results[e.target.value] || results[e.target.value].length === 0 || results[e.target.value].length !== maxItems) {
                        let index = Number(e.target.value)
                        let previndex = Number(e.target.value) - 1
                        let nextindex = Number(e.target.value) + 1
                        const citiesRef = collection(db, "codesnippets");
                        console.log("updated")
                        let q = query(citiesRef, orderBy("downloads", "desc"), limit(maxItems), startAfter(lastResult[previndex]));
                        if (language !== "Any") {
                            q = query(q, where("codeLanguage", '==', language))
                        }
                        getDocs(q).then((doc) => {
                            let push_results = []
                            let i = 0;
                            doc.forEach(doc => {
                                push_results.push(doc.data())
                                i++
                                if (i === maxItems) {
                                    let new_last_results = lastResult
                                    new_last_results[e.target.value] = doc
                                    setLastResult({...new_last_results})
                                }
                            })

                            let new_results = results
                            new_results[index] = push_results
                            setResults({...new_results})
                            console.log({...new_results})
                            setTimeout(() => {
                                setPage(index)
                                console.log("it's updated")
                            }, 1)
                        })
                    } else {
                        setPage(e.target.value)
                    }
                }}>
                    {
                        processPages().map((item, index) =>
                            (
                                <option value={Number(item)} key={index}>PAGE. {item}</option>
                            )
                        )
                    }
                </select>
                <select onChange={e => {
                    setMaxItems(e.target.value)
                    console.log(e.target.value)
                    countQueryDb(e.target.value, language, page, true)
                }} value={maxItems}>
                    <option key={10} value={10}>10 RESULTS</option>
                    <option key={15} value={15}>15 RESULTS</option>
                    <option key={20} value={20}>20 RESULTS</option>
                    <option key={25} value={25}>25 RESULTS</option>
                </select>
                <select value={language}
                        onChange={e => {
                            setLanguage(e.target.value)
                            countQueryDb(maxItems, e.target.value, page)
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
                {section_items(results[page])}
            </ul>
            <CodePagePreview/>
        </>
    )
}