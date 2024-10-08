import "./CodePage.css"
import {getLanguageName, languageExtensions, python} from "./lang.jsx"
import {useEffect, useId, useState} from "react";
import {ClosePreview} from "./CodePagePreview.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import {db, userdb} from "./firebase.js";
import shortNumber from "short-number";
import timeago from 'epoch-timeago';
import Loading from "./Loading.jsx";
import {decrypt} from "./encrypt.js";
import {decompressFromBase64} from "lz-string";
import {deleteObject, getDownloadURL, getStorage, ref, uploadString} from "firebase/storage";
import {licenses} from "./licenses.jsx";


export default function CodePage() {
    const navigate = useNavigate()
    const favoritebtnid = useId()
    const [isFavorite, setIsFavorite] = useState(false)
    const codeid = useParams().codeid
    const [codedata, setCodeData] = useState(null)


    const ratepopup = useId()

    const bannerid = useId()
    const pricesupersetid = useId()
    const priceid = useId()
    const priceidb = useId()
    const nameid = useId()
    const charid = useId()
    const updateid = useId()
    const licenseid = useId()
    const authorid = useId()
    const likesid = useId()
    const dislikesid = useId()
    const descid = useId()
    const languageid = useId()
    const downloadsid = useId()

    const ratebtnid = useId()

    const [language, setLanguage] = useState(<>
        {python}
    </>)


    const [isRun, setIsRun] = useState(false)
    if (!isRun) {
        setIsRun(true)
        const codeRef = doc(db, "codesnippets", codeid);
        getDoc(codeRef).then((docSnap) => {
            if (docSnap.exists()) {
                setCodeData(docSnap.data())
                console.log("found it")
            } else {
                navigate("/404")
            }
        })
    }

    useEffect(() => {
        if (codedata) {
            console.log(codedata)
            document.getElementById(bannerid).src = codedata.bannerUrl
            document.getElementById(downloadsid).innerText = codedata.downloads.length
            if (codedata.price === 0) {
                document.getElementById(pricesupersetid).innerText = "📁 Download"
                document.getElementById(pricesupersetid).onmouseenter = () => {
                    document.getElementById(pricesupersetid).innerText = "📂 Download"
                }
                document.getElementById(pricesupersetid).onmouseleave = () => {
                    document.getElementById(pricesupersetid).innerText = "📁 Download"
                }
            } else {
                document.getElementById(priceid).innerText = codedata.price
            }
            document.getElementById(nameid).innerText = codedata.title
            document.getElementById(charid).innerText = shortNumber(codedata.char)
            document.getElementById(updateid).innerText = timeago(codedata.updated - 60000 * 10)
            if (codedata.license) {
                document.getElementById(licenseid).innerHTML = codedata.license
                document.getElementById(licenseid).href = licenses.find(license => license.licenseId === codedata.license).seeAlso
            } else {
                document.getElementById(licenseid).parentNode.parentNode.removeChild(document.getElementById(licenseid).parentNode)
            }
            document.getElementById(likesid).innerText = shortNumber(codedata.likes.length)
            document.getElementById(dislikesid).innerText = shortNumber(codedata.dislikes.length)
            document.getElementById(descid).innerText = codedata.desc
            setLanguage(<>
                {getLanguageName(codedata.codeLanguage)}
            </>)

            document.getElementById(authorid).innerText = codedata.authorusername

            if (userdb && codedata.authorid === userdb.id) {
                document.getElementById(authorid).innerText = userdb.username
                // is user
                document.getElementById(ratebtnid).innerText = "💻 Edit"
                if (document.getElementById(ratepopup) && document.getElementById(ratepopup).parentNode) {
                    document.getElementById(ratepopup).parentNode.removeChild(document.getElementById(ratepopup))
                }
                document.getElementById(ratebtnid).onclick = () => {
                    navigate("/code/" + codedata.id + "/edit")
                    // setCodeData([])
                    // window.location.reload()
                }

                document.getElementById(favoritebtnid).innerHTML = "<span class='emojifix'>🗑️</span> Delete"
                document.getElementById(favoritebtnid).onclick = () => {
                    if (document.getElementById(favoritebtnid).innerHTML.includes("Delete")) {
                        document.getElementById(favoritebtnid).innerHTML = "<span class='emojifix'>❓</span> Confirm(3)"
                    } else if (document.getElementById(favoritebtnid).innerHTML.includes("Confirm(3)")) {
                        document.getElementById(favoritebtnid).innerHTML = "<span class='emojifix'>❓</span> Confirm(2)"
                    } else if (document.getElementById(favoritebtnid).innerHTML.includes("Confirm(2)")) {
                        document.getElementById(favoritebtnid).innerHTML = "<span class='emojifix'>❓</span> Confirm(1)"
                    } else if (document.getElementById(favoritebtnid).innerHTML.includes("Confirm(1)")) {
                        document.getElementById(favoritebtnid).innerHTML = "<span class='emojifix'>✅</span> Confirm(!)"
                    } else if (document.getElementById(favoritebtnid).innerHTML.includes("CONFIRM(!)")) {
                        // DELETE LOGIC
                        const storage = getStorage();

                        const bannerRef = ref(storage, 'codesnippets/' + codedata.id + "/banner/banner.webp");
                        const bannerMinRef = ref(storage, 'codesnippets/' + codedata.id + "/banner/banner-min.webp");

                        deleteObject(bannerRef)
                        deleteObject(bannerMinRef)
                        deleteDoc(doc(db, "codesnippets", codedata.id))
                        getDownloadURL(ref(storage, 'sitemap.txt'))
                            .then((url) => {
                                let storedText;

                                fetch(url)
                                    .then(function (response) {
                                        response.text().then(function (text) {
                                            storedText = text;
                                            storedText = storedText.replace(codedata.id + "###" + codedata.updated, "")
                                            const storageRef = ref(storage, 'sitemap.txt');
                                            console.log("did it!!!!!")

                                            uploadString(storageRef, storedText).then(() => {
                                                navigate("/")

                                            })
                                        });
                                    });
                            })

                    }
                }
            } else {
                document.getElementById(authorid).innerText = "LOADING"
                getDoc(doc(db, "users", codedata.authorid)).then((docSnap) => {
                    if (docSnap.exists()) {
                        document.getElementById(authorid).innerText = docSnap.data().username
                    }
                })
            }

            if (userdb && userdb.favorites && userdb.favorites.includes(codedata.id)) {
                document.getElementById(favoritebtnid).style.color = "transparent"
                setTimeout(() => {
                    document.getElementById(favoritebtnid).innerHTML = document.getElementById(favoritebtnid).innerHTML.replace("FAVORITE", "UN-FAVORITE")
                    document.getElementById(favoritebtnid).style.color = null
                    document.getElementById(favoritebtnid).firstChild.style.color = "white"
                }, 250)
                setIsFavorite(true)
            } else if (!userdb) {
                disableBtn(document.getElementById(ratebtnid))
                disableBtn(document.getElementById(favoritebtnid))
                // if (codedata.price > 0) {
                ////     disable price button for non-signed in users and paid code snippets
                // }
            }
        }
    }, [codedata])


    if (codedata === null) {
        return (
            <>
                <Loading/>
            </>
        )
    }

    function disableBtn(button) {
        button.style.filter = "brightness(0.75)"
        button.style.pointerEvents = "none"
    }


    // prevent two db download updates
    let downloaded = false
    return (
        <>
            <div>
                <div className="codepgpre codepg">
                    <img
                        src="https://www.codingcreativo.it/wp-content/uploads/2022/10/fibonacci-sequence-in-python.jpg"
                        alt="Banner" className="codepg-img" id={bannerid} onMouseDown={e => {
                        if (e.button === 2) {
                            return false;
                        }
                    }}/>
                    <div className="codepg-btngp">
                        <button className="primary" onClick={() => {
                            console.log("DOWNLOAD BTN CLICK")
                            const download = () => {
                                let decrypted_code = decompressFromBase64(codedata.code)
                                let key = codedata.id + "-" + codedata.crypto + "-" + codedata.id
                                decrypted_code = decrypt(decrypted_code, key)
                                // console.log(decrypted_code)
                                let download = (filename, text) => {
                                    let element = document.createElement('a');
                                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                                    element.setAttribute('download', filename);

                                    element.style.display = 'none';
                                    document.body.appendChild(element);

                                    element.click();

                                    document.body.removeChild(element);
                                }
                                download(codedata.title + languageExtensions[codedata.codeLanguage], decrypted_code)
                                console.log("DOWNLOADED")

                            }


                            if (codedata.price === 0) {
                                console.log("PRICE == 0")
                                if (userdb && !codedata.downloads.includes(userdb.id) && !downloaded && codedata.authorid !== userdb.id) {
                                    console.log("READING NEWEST DOWNLOADS")
                                    const codeRef = doc(db, "codesnippets", codedata.id);
                                    getDoc(codeRef).then((docSnap) => {
                                        if (docSnap.exists()) {
                                            let new_downloads = [...docSnap.data().downloads]
                                            new_downloads.push(userdb.id)
                                            updateDoc(codeRef, {
                                                downloads: new_downloads,
                                                downloadslen: docSnap.data().downloadslen + 1 || 1
                                            }).then(() => {
                                                downloaded = true
                                                console.log("UPDATED CODE DOWNLOADS")
                                                download()
                                                let new_snippets = []
                                                if (userdb.ownedsnippets) {
                                                    new_snippets = [...userdb.ownedsnippets]
                                                }
                                                new_snippets.push(codedata.id)
                                                updateDoc(doc(db, "users", userdb.id), {
                                                    ownedsnippets: new_snippets
                                                }).then(() => {
                                                    console.log("user has downloaded")
                                                })
                                            })
                                        } else {
                                            navigate("/404")
                                        }
                                    })
                                } else {
                                    download()
                                }

                            } else {
                                // Payment logic
                            }


                        }} id={pricesupersetid}>🛒 Buy for <span id={priceid}>5</span>$
                        </button>
                        <button className="primary" onClick={() => {
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
                        }} id={ratebtnid}>⭐️ Rate
                        </button>
                        <button className="primary " id={favoritebtnid} onClick={() => {
                            let fav_condition = !userdb.favorites || !userdb.favorites.includes(codedata.id)
                            if (userdb && !isFavorite && fav_condition && userdb.id !== codedata.authorid) {
                                let new_favorites = [...userdb.favorites || []]
                                new_favorites.push(codedata.id)

                                const userRef = doc(db, "users", userdb.id);
                                updateDoc(userRef, {
                                    favorites: new_favorites
                                }).then(() => {
                                    document.getElementById(favoritebtnid).style.color = "transparent"
                                    setTimeout(() => {
                                        document.getElementById(favoritebtnid).innerHTML = document.getElementById(favoritebtnid).innerHTML.replace("FAVORITE", "UN-FAVORITE")
                                        document.getElementById(favoritebtnid).style.color = null
                                        document.getElementById(favoritebtnid).firstChild.style.color = "white"
                                    }, 250)
                                    setIsFavorite(true)
                                })
                            } else {
                                if (userdb && userdb.favorites && userdb.favorites.includes(codedata.id) && userdb.id !== codedata.authorid) {
                                    let new_favorites = [...userdb.favorites]
                                    let new_favorites_index = new_favorites.indexOf(codedata.id)
                                    new_favorites.splice(new_favorites_index, 1)

                                    const userRef = doc(db, "users", userdb.id);
                                    updateDoc(userRef, {
                                        favorites: new_favorites
                                    }).then(() => {
                                        document.getElementById(favoritebtnid).style.color = "transparent"
                                        setTimeout(() => {
                                            document.getElementById(favoritebtnid).innerHTML = document.getElementById(favoritebtnid).innerHTML.replace("UN-FAVORITE", "FAVORITE")
                                            document.getElementById(favoritebtnid).style.color = null
                                            document.getElementById(favoritebtnid).firstChild.style.color = "white"
                                        }, 250)
                                        setIsFavorite(false)
                                    })
                                } else if (!userdb.favorites) {
                                    console.log("yeah")
                                }
                            }
                        }}><span className="emojifix">❤️</span>️ Favorite
                        </button>
                    </div>
                    <h1 className="codepgpre-title" id={nameid}>Placeholder</h1>
                    <h3 className="codepgpre-info">{/*💵 <span id={priceidb}>5</span>$*/}
                        <span id={downloadsid}></span>
                        <svg className="codepgpre-dwn" width="20px" height="20px" strokeWidth="2" viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg" color="#fff">
                            <path d="M6 20L18 20" stroke="#Dadada" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                            <path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="#Dadada" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span
                            className="codepgpre-infosep">-</span> <span id={languageid}>{language}</span> <span
                            className="codepgpre-infosep">-</span> 👍<span id={likesid}>1K</span> <span
                            className="codepgpre-infosep">-</span> 👎<span id={dislikesid}>5K</span> <span
                            className="codepgpre-infosep">-</span> <span
                            id={charid}>15000</span> char.
                    </h3>
                    <h3 className="codepgpre-info codepg-update uppercase">⏰ Updated <span
                        id={updateid}>PLACEHOLDER AGO</span></h3>
                    <h3 className="codepgpre-info codepg-update codepg-license">🏛️ <a id={licenseid}
                                                                                      target="_blank">PLACEHOLDER</a>
                    </h3>
                    <h4 className="codepgpre-author">by <Link className="link-text" to={"/" + codedata.authorusername}
                                                              id={authorid}>Horace Hoff</Link></h4>
                    <h2 className="codepgpre-desc codepg-desc" id={descid}>Lorem ipsum dolor sit amet</h2>
                </div>
                <div className="codepgpre-bg" id={ratepopup} onClick={e => {
                    if (e.target === e.currentTarget) {
                        ClosePreview(ratepopup)
                    }
                }}>
                    <div className="codepg-ratepop">
                        <h3>RATE</h3>
                        <button className="primary" onClick={() => {
                            // like method
                            if (userdb && !codedata.likes.includes(userdb.id)) {
                                let new_likes = [...codedata.likes]
                                new_likes.push(userdb.id)
                                let new_dislikes = [...codedata.dislikes]
                                let new_dislikes_index = new_dislikes.indexOf(userdb.id)
                                if (new_dislikes_index > -1) {
                                    new_dislikes.splice(new_dislikes_index, 1)
                                }
                                const codeRefRate = doc(db, "codesnippets", codedata.id);
                                updateDoc(codeRefRate, {
                                    likes: new_likes,
                                    dislikes: new_dislikes
                                }).then(() => {
                                    ClosePreview(ratepopup)
                                    // disableBtn(document.getElementById(ratebtnid))
                                    console.log("liked")
                                })
                            } else {
                                ClosePreview(ratepopup)
                            }
                        }}>👍 LIKE
                        </button>
                        <button className="primary" onClick={() => {
                            // dislike method
                            if (userdb && !codedata.dislikes.includes(userdb.id)) {
                                let new_dislikes = [...codedata.dislikes]
                                new_dislikes.push(userdb.id)
                                let new_likes = [...codedata.likes]
                                let new_likes_index = new_likes.indexOf(userdb.id)
                                if (new_likes_index > -1) {
                                    new_likes.splice(new_likes_index, 1)
                                }
                                const codeRefRate = doc(db, "codesnippets", codedata.id);
                                updateDoc(codeRefRate, {
                                    likes: new_likes,
                                    dislikes: new_dislikes
                                }).then(() => {
                                    ClosePreview(ratepopup)
                                    // disableBtn(document.getElementById(ratebtnid))
                                    console.log("disliked")
                                })
                            } else {
                                ClosePreview(ratepopup)
                            }
                        }}>👎 DISLIKE
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}