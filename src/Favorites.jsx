import {useNavigate} from "react-router-dom";
import "./Explore.css"
import {useEffect, useId, useState} from "react";
import {auth, db, userdb} from "./firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {section_items} from "./SectionItems.jsx";
import CodePagePreview from "./CodePagePreview.jsx";

export default function Favorites() {
    const navigate = useNavigate()
    const listid = useId()


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
            <h1 className="pg-heading" id="pg-heading">Favorites</h1>
            <h2 className="pg-subtitle">Browse your favorite code snippets</h2>
            <ul className="pg-section-list" id={listid}>
                {section_items(favorites, navigate)}
            </ul>
            <CodePagePreview/>
        </>
    )
}