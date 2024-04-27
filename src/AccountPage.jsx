import "./AccountPage.css"
import {useEffect, useId, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {collection, doc, getCountFromServer, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db, userdb} from "./firebase.js";
import shortNumber from "short-number"
import Loading from "./Loading.jsx";
import CodePagePreview from "./CodePagePreview.jsx";
import {section_items} from "./SectionItems.jsx";

export default function AccountPage() {
    const navigate = useNavigate()


    const bannerid = useId()
    const bannerblurid = useId()
    const titleid = useId()
    const worldid = useId()
    const githubid = useId()
    const githubcontid = useId()
    const followid = useId()
    const followbtnid = useId()
    const bioid = useId()
    const snippetsid = useId()

    const snippetsleftid = useId()
    const snippetsrightid = useId()

    const userid = useParams().user
    const [userdata, setUserdata] = useState(null)
    const [isRun, setIsRun] = useState(false)
    const [userSnippets, setUserSnippets] = useState([])
    if (!isRun) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", userid));

        getDocs(q).then((querySnapshot) => {
            let has_validated = false
            querySnapshot.forEach((doc) => {
                setUserdata(doc.data())
                setIsRun(true)
                has_validated = true
            })
            if (!has_validated) (
                navigate("/404")
            )
        })
    }

    useEffect(() => {
        if (userdata) {
            // count followers
            document.getElementById(titleid).innerHTML = userdata.username
            document.getElementById(bannerid).src = userdata.banner
            document.getElementById(worldid).innerText = "🌎 EARTH"
            if (userdata.country) {
                document.getElementById(worldid).innerText = "🌎 " + userdata.country
            }
            const followquery = query(collection(db, "users"), where("following", "array-contains", userdata.id));
            getCountFromServer(followquery).then((count) => {
                if (!userdata.github && count.data().count === 0) {
                    document.getElementById(worldid).style.marginBottom = "40px"
                }
                if (userdata.github && count.data().count === 0) {
                    document.getElementById(githubid).innerText = " " + userdata.github
                    document.getElementById(githubcontid).style.marginBottom = "27px"
                    document.getElementById(githubcontid).style.display = "block"
                }
                if (!userdata.github && count.data().count > 0) {
                    document.getElementById(followid).innerText = "👨‍💻 " + shortNumber(count.data().count) + " followers"
                    document.getElementById(followid).style.display = "block"
                    document.getElementById(followid).style.marginBottom = "0"
                    document.getElementById(followid).style.marginTop = "3px"
                }
                if (userdata.github && count.data().count > 0) {
                    document.getElementById(githubid).innerText = " " + userdata.github
                    document.getElementById(githubcontid).style.display = "block"
                    document.getElementById(githubcontid).style.marginBottom = "0"
                    document.getElementById(followid).innerText = "👨‍💻 " + shortNumber(count.data().count) + " followers"
                    document.getElementById(followid).style.display = "block"
                    document.getElementById(followid).style.marginBottom = "25px"
                    document.getElementById(followid).style.marginTop = "10px"
                    if (!userdb) {
                        document.getElementById(followid).style.marginTop = "13px"
                    }
                }
                if (userdata.github) {
                    document.getElementById(githubcontid).onclick = () => {
                        console.log("clicked")
                        window.open("https://github.com/" + userdata.github, '_blank').focus()
                    }
                }
            })

            document.getElementById(bioid).innerText = userdata.bio


            document.getElementById(bannerid).src = userdata.banner
            document.getElementById(bannerblurid).style.backgroundImage = "url('" + userdata.banner + "')"

            let has_snippets = false
            let snippets_num = 0
            const snippetsRef = collection(db, "codesnippets");
            const q = query(snippetsRef, where("authorid", "==", userdata.id));
            getDocs(q).then((queryResult) => {
                queryResult.forEach((doc) => {
                    setUserSnippets(prevSnippets => [...prevSnippets, doc.data()])
                    has_snippets = true
                    snippets_num += 1
                })
                if (!has_snippets) {
                    document.getElementById(snippetsid).parentNode.removeChild(document.getElementById(snippetsid))
                }
                if (snippets_num === 1) {
                    console.log("yeah")
                    // document.getElementById(snippetsleftid).parentNode.removeChild(document.getElementById(snippetsleftid))
                    // document.getElementById(snippetsrightid).parentNode.removeChild(document.getElementById(snippetsrightid))
                }
            })

            if (userdb) {
                if (userdata.id === userdb.id) {
                    document.getElementById(followbtnid).parentNode.removeChild(document.getElementById(followbtnid))
                }

                if (userdb.following.includes(userdata.id)) {
                    document.getElementById(followbtnid).innerHTML = "<span class='emojifix'>💔</span> UNFOLLOW"
                }
            } else {
                document.getElementById(followbtnid).parentNode.removeChild(document.getElementById(followbtnid))
            }
        }
    }, [userdata])


    if (userdata === null) {
        return (
            <>
                <Loading/>
            </>
        )
    }

    return (
        <>
            <div className="ucnt">
                <div className="ubnr-cont" id={bannerblurid}>
                    <img id={bannerid} className="ubnr" alt="banner"
                         src={""}/>
                </div>


                <br/>


                <h1 id={titleid} className="noscbr">LOADING...</h1>
                <p className="ucntinf action-text ucntinfacn" style={{marginBottom: "25px"}} id={followbtnid}
                   onClick={() => {
                       if (userdb) {
                           if (userdb.following.includes(userdata.id)) {
                               console.log("unfollowing")
                               let new_following = [...userdb.following]
                               var index = new_following.indexOf(userdata.id);
                               if (index !== -1) {
                                   new_following.splice(index, 1);
                               }
                               updateDoc(doc(db, "users", userdb.id), {
                                   following: [...new_following]
                               })
                               document.getElementById(followbtnid).innerHTML = "<span class='emojifix'>❤️</span> FOLLOW"
                           } else {
                               updateDoc(doc(db, "users", userdb.id), {
                                   following: [...userdb.following, userdata.id]
                               })
                               document.getElementById(followbtnid).innerHTML = "<span class='emojifix'>💔</span> UNFOLLOW"
                           }
                       }
                   }}><span
                    className="emojifix">❤️</span> FOLLOW</p>
                <p className="ucntinf" id={worldid} style={{marginBottom: "25px"}}>🌎 LOADING...</p>
                <p className="ucntinf ucntgit" id={githubcontid} style={{display: "none"}}>
                    <svg viewBox="0 0 128 128">
                        <g>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path>
                            <path
                                d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                        </g>
                    </svg>
                    <span id={githubid}>{" just-a-mango"}</span>
                </p>
                <p className="ucntinf" id={followid} style={{display: "none"}}>👨‍💻 LOADING...</p>
                <h2 className="ucntdsc" id={bioid}>LOADING...</h2>


                <div id={snippetsid}>
                    <h4 onClick={() => {
                        if (document.getElementById(snippetsid).children[1].style.display === "block") {
                            document.getElementById(snippetsid).children[1].style.display = "none"
                            document.getElementById(snippetsid).children[0].children[0].style.transform = "rotate(0deg)"
                        } else {
                            document.getElementById(snippetsid).children[1].style.display = "block"
                            document.getElementById(snippetsid).children[0].children[0].style.transform = "rotate(90deg)"
                        }
                    }} className="ucntpub"><span>{">"}</span> CODE SNIPPETS</h4>


                    <div style={{display: "none"}}>
                        <button id={snippetsleftid} onClick={() => {
                            if (document.getElementById("ucntsnips").scrollLeft - 317 >= 0) {
                                document.getElementById("ucntsnips").scroll({
                                    left: document.getElementById("ucntsnips").scrollLeft - 317,
                                    behavior: "smooth"
                                })
                            } else {
                                document.getElementById("ucntsnips").scroll({
                                    left: 0
                                })
                            }
                        }} className="ucntsnips-btn">
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_489_191279)">
                                    <g clipPath="url(#clip1_489_191279)" stroke="currentColor" strokeWidth="2"
                                       strokeLinecap="round" strokeLinejoin="round">
                                        <path
                                            d="M15 4L9.828 9.172c-1.333 1.333-2 2-2 2.828 0 .828.667 1.495 2 2.828L15 20"></path>
                                        <path
                                            d="M15 4L9.828 9.172c-1.333 1.333-2 2-2 2.828 0 .828.667 1.495 2 2.828L15 20"></path>
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_489_191279">
                                        <path fill="currentColor" d="M0 0H24V24H0z"></path>
                                    </clipPath>
                                    <clipPath id="clip1_489_191279">
                                        <path fill="currentColor" transform="rotate(-90 12 12)"
                                              d="M0 0H24V24H0z"></path>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>


                        <ul className="pg-section-list srch-section-list ucntsnips" id="ucntsnips" style={{
                            display: "inline-block",
                            whiteSpace: "nowrap"
                        }}>
                            {section_items(userSnippets, navigate)}
                        </ul>


                        <button id={snippetsrightid} className="ucntsnips-btn" onClick={() => {
                            if (document.getElementById("ucntsnips").scrollLeft + 317 <= document.getElementById("ucntsnips").scrollWidth) {
                                document.getElementById("ucntsnips").scroll({
                                    left: document.getElementById("ucntsnips").scrollLeft + 317,
                                    behavior: "smooth"
                                })
                            } else {
                                document.getElementById("ucntsnips").scroll({
                                    left: document.getElementById("ucntsnips").scrollWidth
                                })
                            }
                        }}>
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_489_191280)">
                                    <g clipPath="url(#clip1_489_191280)" stroke="currentColor" strokeWidth="2"
                                       strokeLinecap="round" strokeLinejoin="round">
                                        <path
                                            d="M9 20l5.172-5.172c1.333-1.333 2-2 2-2.828 0-.828-.667-1.495-2-2.828L9 4"></path>
                                        <path
                                            d="M9 20l5.172-5.172c1.333-1.333 2-2 2-2.828 0-.828-.667-1.495-2-2.828L9 4"></path>
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_489_191280">
                                        <path fill="currentColor" d="M0 0H24V24H0z"></path>
                                    </clipPath>
                                    <clipPath id="clip1_489_191280">
                                        <path fill="currentColor" transform="rotate(90 12 12)" d="M0 0H24V24H0z"></path>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <CodePagePreview/>
        </>
    )
}