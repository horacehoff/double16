import CodeCard from "./CodeCard.jsx";
import {getLanguageName} from "./lang.jsx";
import ShortNumber from "short-number";
import {useNavigate} from "react-router-dom";
import "./Explore.css"
import {useEffect, useId, useState} from "react";
import {auth, db, userdb} from "./firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";

export default function Favorites() {
    const navigate = useNavigate()
    const listid = useId()
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
                                navigate("/" + codesnippet.authorusername)
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


    const [favorites, setFavorites] = useState([])
    let has_run = false;

    function waitForUserData() {
        if (userdb !== null && userdb && !has_run) {
            for (let i = 0; i < userdb.favorites.length; i++) {
                getDoc(doc(db, "codesnippets", userdb.favorites[i])).then(r => {
                    if (r.exists()) {
                        setFavorites(oldArray => [...oldArray, r.data()]);
                    }
                })
            }
            has_run = true
        } else {
            if ((userdb === null || userdb) && !has_run) {
                setTimeout(waitForUserData, 100);
            }
        }
    }


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                waitForUserData()
            } else {
                navigate("/404")
            }
        })
    }, [])
    return (
        <>
            <h1 className="pg-heading" id="pg-heading">FAVORITES</h1>
            <h2 className="pg-subtitle">BROWSE YOUR FAVORITE CODE SNIPPETS</h2>
            <ul className="pg-section-list" id={listid}>
                {section_items(favorites)}
            </ul>
        </>
    )
}