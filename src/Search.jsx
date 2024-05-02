import "./Search.css"
import "./Explore.css"
import CodePagePreview, {ClosePreview} from "./CodePagePreview.jsx";
import {useId, useState} from "react";
import {languages_list} from "./lang.jsx";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "./firebase.js";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {section_items} from "./SectionItems.jsx";

export default function Search() {
    const ratepopup = useId()
    const navigate = useNavigate()


    const sectionList = useId()
    const noSearchResults = useId()

    const searchQueryId = useId()
    const [searchQuery, setSearchQuery] = useState("")
    const [author, setAuthor] = useState("")
    const [downloads, setDownloads] = useState(0)
    const [download_order, setDowloadOrder] = useState("MORE")
    const [language, setLanguage] = useState("Any")

    const [returnData, setReturnData] = useState([])

    async function query_search() {
        document.getElementById(noSearchResults).style.display = "none"
        document.getElementById(sectionList).style.display = "block"
        let combinedQuery = query(collection(db, "codesnippets"), limit(9));
        if (searchQuery && searchQuery !== "") {
            combinedQuery = query(combinedQuery, where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"), orderBy("title"));
        } else if (downloads !== null && downloads !== "") {
            console.log("DOWNLOADS")
            console.log(downloads)
            if (download_order === "MORE") {
                combinedQuery = query(combinedQuery, where("downloadslen", ">", Number(downloads)), orderBy("downloadslen", "desc"));
            } else {
                combinedQuery = query(combinedQuery, where("downloadslen", "<", Number(downloads)), orderBy("downloadslen", "desc"));
            }
        }
        if (author && author !== "") {
            console.log("AUTHOR")
            console.log(author)
            combinedQuery = query(combinedQuery, where("authorusername", "==", author));
        }


        if (language !== null && language !== "" && language !== "Any") {
            console.log(language)
            console.log("LANGUAGE")
            combinedQuery = query(combinedQuery, where("codeLanguage", "==", language));
        }

        combinedQuery = query(combinedQuery, limit(10));
        const querySnapshot = await getDocs(combinedQuery);
        let return_array = []
        setReturnData([])
        querySnapshot.forEach((doc) => {
            return_array.push(doc.data())
            setReturnData(prev => [...prev, doc.data()])
        });
        if (return_array.length === 0) {
            document.getElementById(noSearchResults).style.display = "block"
            document.getElementById(sectionList).style.display = "none"
        }
        console.log(return_array)
    }


    return (
        <>
            <Helmet>
                <title>Double16 | Search</title>
                <meta content="Double16 | Search"
                      name="title"/>
                <meta content="Search and find the exact code snippet you need."
                      name="description"/>

                <meta content="https://www.double16.tech/search" property="og:url"/>
                <meta content="Double16 | Search" property="og:title"/>
                <meta content="Search and find the exact code snippet you need."
                      property="og:description"/>

                <meta content="https://www.double16.tech/search" property="twitter:url"/>
                <meta content="Double16 | Search" property="twitter:title"/>
                <meta content="Search and find the exact code snippet you need."
                      property="twitter:description"/>
            </Helmet>
        <h1 className="pg-heading" id="pg-heading">SEARCH</h1>
        <h2 className="pg-subtitle">SEARCH AND FIND THE EXACT CODE SNIPPET YOU NEED</h2>
        <div className="srch-cont">
            <input placeholder="@search_query" type="text" value={searchQuery} onChange={e => {
                if (e.target.value !== "") {
                    if (!document.getElementById(searchQueryId).classList.contains("disabled")) {
                        document.getElementById(searchQueryId).classList.add("disabled")
                    }
                } else {
                    if (document.getElementById(searchQueryId).classList.contains("disabled")) {
                        document.getElementById(searchQueryId).classList.remove("disabled")
                    }
                }
                setSearchQuery(e.target.value)
            }}/>
            <br/>
            <button className="accent srch-flt" onClick={() => {
                document.getElementById("root").style.pointerEvents = "none"
                document.getElementById("root").style.touchAction = "none"
                document.getElementById(ratepopup).style.pointerEvents = "all"
                document.getElementById(ratepopup).style.touchAction = "auto"
                document.getElementById(ratepopup).style.display = "block"
                setTimeout(() => {
                    document.getElementById(ratepopup).style.opacity = "1"
                }, 1)
                let childdiv = document.getElementById(ratepopup).children[0]
                setTimeout(() => {
                    childdiv.style.marginTop = "0"
                }, 1)
            }}><span className="emojifix">⚙️</span>️ FILTERS
            </button>
            <br/>
            <button className="primary srch-btn" type="submit" onClick={e => {
                e.preventDefault()
                if (searchQuery !== "" || author !== "" || downloads !== 0 || download_order !== "MORE" || language !== "Any") {
                    query_search()
                }
            }}>SEARCH <span className="emojifix">🔎</span></button>


        </div>
        <p className="srch-nsr" id={noSearchResults}>NO SEARCH RESULTS</p>
        <ul className="pg-section-list srch-section-list" id={sectionList}>
            {section_items(returnData, navigate)}
        </ul>
        <div className="codepgpre-bg" id={ratepopup} onClick={e => {
            if (e.target === e.currentTarget) {
                ClosePreview(ratepopup)
            }
        }}>
            <div className="codepg-ratepop srch-flt-pg">
                <h4><span className="emojifix">⚙️</span>️ FILTERS</h4>
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={() => ClosePreview(ratepopup)}>
                    <g clipPath="url(#clip0_489_191299)">
                        <path d="M5 5l14 14m0-14L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_489_191299">
                            <path fill="currentColor" d="M0 0H24V24H0z"/>
                        </clipPath>
                    </defs>
                </svg>
                <p>--- AUTHOR ---</p>
                <input placeholder="@author" type="text" value={author} onChange={e => setAuthor(e.target.value)}/>
                <p>--- DOWNLOADS ---</p>
                <div id={searchQueryId}>
                    <select value={download_order} onChange={e => setDowloadOrder(e.target.value)}>
                        <option>MORE</option>
                        <option>LESS</option>
                    </select>
                    <input className="sell-cont-price" placeholder="@downloads" type="number"
                           value={downloads} onChange={e => {
                        let to_set = e.target.value.replace(/^0+/, "")
                        if (e.target.value < 0 && e.target.value && e.target.value !== 0) {
                            to_set = 0
                        }
                        if (e.target.value === "" || !e.target.value) {
                            to_set = 0
                        }
                        if (e.target.value === "0" || e.target.value === 0) {
                            to_set = 0
                        }
                        setDownloads(to_set)
                    }}/>
                </div>
                <p>--- PROGRAMMING LANGUAGE ---</p>
                <select style={{width: "319px", left: "2px", position: "relative"}} value={language}
                        onChange={e => setLanguage(e.target.value)}>
                    <option>Any</option>
                    {languages_list.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <CodePagePreview/>
    </>);
}