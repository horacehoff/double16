import "./Explore.css"
import {Link, useNavigate} from "react-router-dom";
import CodePagePreview from "./CodePagePreview.jsx";
import {useState} from "react";
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import {db} from "./firebase.js";
import {Helmet} from "react-helmet";
import {section_items} from "./SectionItems.jsx";

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

    return (
        <>
            <Helmet>
                <title>Double16 | Explore</title>
                <meta content="Double16 | Explore"
                      name="title"/>
                <meta content="Explore and discover code snippets."
                      name="description"/>

                <meta content="https://www.double16.tech/explore" property="og:url"/>
                <meta content="Double16 | Explore" property="og:title"/>
                <meta content="Explore and discover code snippets."
                      property="og:description"/>

                <meta content="https://www.double16.tech/explore" property="twitter:url"/>
                <meta content="Double16 | Explore" property="twitter:title"/>
                <meta content="Explore and discover code snippets."
                      property="twitter:description"/>
            </Helmet>
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

            <Link to="/most-downloaded">
                <button className="pg-section-btn">{more_svg}</button>
            </Link>
            <ul className="pg-section-list">
                {section_items(mostDownloaded, navigate)}
            </ul>

            <br/>

            <h2 className="pg-section-heading">🔥 TRENDING</h2>

            <Link to="/trending">
                <button className="pg-section-btn">{more_svg}</button>
            </Link>
            <ul className="pg-section-list">
                {section_items(trending, navigate)}
            </ul>

            <br/>

            <h2 className="pg-section-heading">⏰ RECENTLY PUBLISHED</h2>

            <Link to="/recently-published">
                <button className="pg-section-btn">{more_svg}</button>
            </Link>
            <ul className="pg-section-list">
                {section_items(recentlyPublished, navigate)}
            </ul>
            <br/>
            <br/>


            <CodePagePreview/>
        </>)
}