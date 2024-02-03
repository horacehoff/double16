import "./Explore.css"
import {Link, useNavigate} from "react-router-dom";
import CodeCard from "./CodeCard.jsx";
import ShortNumber from "short-number"
import CodePagePreview from "./CodePagePreview.jsx";
import {getLanguageName} from "./lang.jsx";
import {useState} from "react";
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import {db} from "./firebase.js";

export default function Explore() {
    const navigate = useNavigate()

    const more_svg = <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_489_191276)">
            <path
                d="M12 20l5.172-5.172c1.333-1.333 2-2 2-2.828 0-.828-.667-1.495-2-2.828L12 4M4 20l5.172-5.172c1.333-1.333 2-2 2-2.828 0-.828-.667-1.495-2-2.828L4 4"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_489_191276">
                <path fill="currentColor" d="M0 0H24V24H0z"/>
            </clipPath>
        </defs>
    </svg>


    const [mostDownloaded, setMostDownloaded] = useState([])
    const [trending, setTrending] = useState([])
    const [recentlyPublished, setRecentlyPublished] = useState([])


    const [isRun, setIsRun] = useState(false)
    if (!isRun) {
        setIsRun(true)
        // most downloaded query
        const mostDownloadedRef = collection(db, "codesnippets");
        const mostDownloadedQuery = query(mostDownloadedRef, orderBy("downloads", "desc"), limit(6));
        getDocs(mostDownloadedQuery).then((querySnapshot) => {
            querySnapshot.forEach((docData) => {
                setMostDownloaded(prevMostDownloaded => [...prevMostDownloaded, docData.data()]);
            })
        })


        // trending query
        const trendingRef = collection(db, "codesnippets");
        const trendingQuery = query(trendingRef, orderBy("downloads", "desc"), orderBy("updated", "desc"), limit(6));
        getDocs(trendingQuery).then((querySnapshot) => {
            querySnapshot.forEach((docData) => {
                setTrending(prevTrending => [...prevTrending, docData.data()]);
            })
        })

        // recently published query
        const recentlyPublishedRef = collection(db, "codesnippets");
        const recentlyPublishedQuery = query(recentlyPublishedRef, orderBy("created", "desc"), limit(6));
        getDocs(recentlyPublishedQuery).then((querySnapshot) => {
            querySnapshot.forEach((docData) => {
                setRecentlyPublished(prevRecentlyPublished => [...prevRecentlyPublished, docData.data()]);
            })
        })
    }


    // useEffect(() => {
    //     if (mostDownloaded.length > 0) {
    //         console.log(mostDownloaded)
    //     }
    // }, [mostDownloaded])

    // let has_run = false
    // useEffect(() => {
    //     if (!has_run) {
    //         has_run = true
    //         // eslint-disable-next-line no-inner-declarations
    //         function random_str(len) {
    //             let result = '';
    //             const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //             while (result.length < len) {
    //                 result += characters.charAt(Math.floor(Math.random() * characters.length));
    //             }
    //             return result
    //         }
    //
    //         // eslint-disable-next-line no-inner-declarations
    //         async function text_matrix(element, initial) {
    //             element.innerHTML = random_str(5)
    //             const timer = ms => new Promise(res => setTimeout(res, ms))
    //             let remaining = initial.length - 1
    //             let typed = ""
    //             for (const char of initial) {
    //                 typed = typed + char
    //                 element.innerHTML = typed + random_str(remaining)
    //                 remaining -= 1
    //                 await timer(50);
    //             }
    //         }
    //
    //         text_matrix(document.getElementById("pg-heading"),document.getElementById("pg-heading").innerText)
    //     }
    // }, [])


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




    return (
        <>
            <h1 className="pg-heading" id="pg-heading">EXPLORE</h1>
            <h2 className="pg-subtitle">EXPLORE ALL THE DIFFERENT CODE SNIPPETS AND FIND THE ONE YOU WANT</h2>
            {/*<button onClick={() => {*/}
            {/*    const uuid = v1()*/}
            {/*    const cryptouuid = crypto.randomUUID()*/}
            {/*    setDoc(doc(db, "codesnippets", uuid), {*/}
            {/*        title: "Homebrew",*/}
            {/*        catchphrase: "A great package manager",*/}
            {/*        desc: "An even greater description",*/}
            {/*        bannerUrl: "https://brew.sh/assets/img/homebrew-social-card.png",*/}
            {/*        bannerMiniUrl: "https://brew.sh/assets/img/homebrew-social-card.png",*/}
            {/*        codeLanguage: "Python",*/}
            {/*        code: compressToBase64(encrypt("print('Hello World')", uuid + "-" + cryptouuid + "-" + uuid)),*/}
            {/*        id: uuid,*/}
            {/*        authorid: userdb.id,*/}
            {/*        authorusername: userdb.username,*/}
            {/*        likes: [],*/}
            {/*        dislikes: [],*/}
            {/*        created: Date.now(),*/}
            {/*        updated: Date.now(),*/}
            {/*        char: "print('Hello World')".match(/\S/g).length,*/}
            {/*        lines: "print('Hello World')".split(/\r|\r\n|\n/).length,*/}
            {/*        crypto: cryptouuid,*/}
            {/*        price: 0,*/}
            {/*        downloads: []*/}
            {/*    })*/}
            {/*}}>CREATE*/}
            {/*</button>*/}
            <Link to="/search">
                <button className="action pg-action">🔍 SEARCH</button>
            </Link>
            <br/>
            <h2 className="pg-section-heading">🏆 MOST DOWNLOADED</h2>

            <button className="pg-section-btn"><Link to="/most-downloaded">{more_svg}</Link></button>
            <ul className="pg-section-list">
                {section_items(mostDownloaded)}
            </ul>

            <br/>

            <h2 className="pg-section-heading">🔥 TRENDING</h2>

            <button className="pg-section-btn"><Link to="/most-downloaded">{more_svg}</Link></button>
            <ul className="pg-section-list">
                {section_items(trending)}
            </ul>

            <br/>

            <h2 className="pg-section-heading">⏰ RECENTLY PUBLISHED</h2>

            <button className="pg-section-btn">{more_svg}</button>
            <ul className="pg-section-list">
                {section_items(recentlyPublished)}
            </ul>


            <CodePagePreview/>
        </>)
}