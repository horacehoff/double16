import "./AccountSettings.css"
import {useEffect, useId, useState} from "react";
import Loading from "./Loading.jsx";
import {auth, db, userdb} from "./firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {ShowPopUp} from "./PopUp.jsx";
import {Helmet} from "react-helmet";

export default function AccountSettings() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState(null)

    const [banner, setBanner] = useState(null)
    const [resetBannerUrl, setResetBannerUrl] = useState(false)
    const [username, setUsername] = useState("")
    const [github, setGithub] = useState("")
    const [bio, setBio] = useState("")
    const [country, setCountry] = useState("")


    const deletebannerid = useId()
    const bannerid = useId()
    const bannerlabelid = useId()
    const usernameid = useId()
    const githubid = useId()
    const bioid = useId()
    const countryid = useId()


    function waitForUserData() {
        if (userdb !== null && userdb) {
            setUserData(userdb)
        } else {
            setTimeout(waitForUserData, 100);
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
        if (userData) {
            setUsername(userData.username)
            setGithub(userData.github)
            setBio(userData.bio)
            setCountry(userData.country)
            document.getElementById(bannerlabelid).children[0].src = userData.banner
            if (!userData.banner.includes("https://source.boringavatars.com/marble/500/")) {
                document.getElementById(deletebannerid).style.display = "inline-block"
            }
        }
    }, [userData])

    function updateProfile(e) {
        if (username !== userData.username) {
            console.log("DIFF")
            const q = query(collection(db, "codesnippets"), where("authorid", "==", userData.id));
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((data) => {
                    updateDoc(doc(db, "codesnippets", data.id), {
                        authorusername: username
                    })
                })
            })

        }
        if (banner) {
            const storage = getStorage()
            const bannerRef = ref(storage, 'users/' + userData.id + "/banner/banner.webp");
            uploadBytes(bannerRef, banner).then((snapshot) => {
                getDownloadURL(bannerRef).then((url) => {
                    updateDoc(doc(db, "users", userData.id), {
                        banner: url,
                        username: username,
                        github: github || "",
                        bio: bio,
                        country: country || ""
                    }).then(() => {
                        e.target.innerText = "SAVED ✅"
                        ShowPopUp("Reload the page to see all changes apply")
                        setTimeout(() => {
                            e.target.innerText = "SAVE"
                        }, 2500)
                    })
                })
            })
        } else if (resetBannerUrl) {
            console.log("YEAH")
            const storage = getStorage()
            const bannerRef = ref(storage, 'users/' + userData.id + "/banner/banner.webp");
            deleteObject(bannerRef).then(() => {
                updateDoc(doc(db, "users", userData.id), {
                    banner: "https://source.boringavatars.com/marble/500/" + username + "?colors=000000,FFFFFF,0E26EA,B700FF,FF0000&square",
                    username: username,
                    github: github || "",
                    bio: bio,
                    country: country || ""
                }).then(() => {
                    e.target.innerText = "SAVED ✅"
                    ShowPopUp("Reload the page to see all changes apply")
                    setTimeout(() => {
                        e.target.innerText = "SAVE"
                    }, 2500)
                })
            })
        } else if (!banner && username !== userdb.username) {
            updateDoc(doc(db, "users", userData.id), {
                banner: "https://source.boringavatars.com/marble/500/" + username + "?colors=000000,FFFFFF,0E26EA,B700FF,FF0000&square",
                username: username,
                github: github || "",
                bio: bio,
                country: country || ""
            }).then(() => {
                e.target.innerText = "SAVED ✅"
                ShowPopUp("Reload the page to see all changes apply")
                setTimeout(() => {
                    e.target.innerText = "SAVE"
                }, 2500)
            })
        } else {
            updateDoc(doc(db, "users", userData.id), {
                username: username,
                github: github || "",
                bio: bio,
                country: country || ""
            }).then(() => {
                e.target.innerText = "SAVED ✅"
                ShowPopUp("Reload the page to see all changes apply")
                console.log("shown")
                setTimeout(() => {
                    e.target.innerText = "SAVE"
                }, 2500)
            })
        }
    }

    function checkValid(str) {
        return /\S/.test(str) && str !== "";
    }


    if (userData === null) {
        return (
            <>
                <Loading/>
            </>
        )
    }
    return (
        <>
            <Helmet>
                <title>Double16 | Settings</title>
                <meta content="Double16 | Settings"
                      name="title"/>
                <meta content="Modify your account settings."
                      name="description"/>

                <meta content="https://www.double16.tech/settings" property="og:url"/>
                <meta content="Double16 | Settings" property="og:title"/>
                <meta content="Modify your account settings."
                      property="og:description"/>

                <meta content="https://www.double16.tech/settings" property="twitter:url"/>
                <meta content="Double16 | Settings" property="twitter:title"/>
                <meta content="Modify your account settings."
                      property="twitter:description"/>
            </Helmet>
            <h1 className="pg-heading" id="pg-heading">Settings</h1>
            <h2 className="pg-subtitle">Modify your account settings</h2>
            <div className="srch-cont setts-cont">
                <h2>PROFILE</h2>
                <div className="setts-bnr">
                    <input type="file" style={{display: "none"}} id={bannerid} onChange={e => {
                        if (e.target.files[0].size / 1024 < 250) {
                            setBanner(e.target.files[0])
                            setResetBannerUrl(false)
                            var selectedFile = e.target.files[0];
                            var reader = new FileReader();
                            var imgtag = document.getElementById(bannerlabelid).children[0];

                            reader.onload = function (event) {
                                imgtag.src = event.target.result;
                            };

                            reader.readAsDataURL(selectedFile);

                            document.getElementById(bannerlabelid).children[0].src = userData.banner
                            document.getElementById(deletebannerid).style.display = "inline-block"
                        } else {
                            ShowPopUp("ERROR: Banner file too big (MAX: 250kB)")
                        }

                    }}/>
                    <button id={deletebannerid} onClick={() => {
                        setResetBannerUrl(true)
                        document.getElementById(bannerlabelid).children[0].src = "https://source.boringavatars.com/marble/500/" + username + "?colors=000000,FFFFFF,0E26EA,B700FF,FF0000&square"
                        document.getElementById(deletebannerid).style.display = "none"
                    }}>
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_489_191523)">
                                <g clipPath="url(#clip1_489_191523)">
                                    <path
                                        d="M5 9.5l1.087 8.036c.223 1.65.335 2.476.9 2.97.566.494 1.398.494 3.064.494h3.898c1.666 0 2.499 0 3.064-.494s.677-1.32.9-2.97L19 9.5M9 6c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C10.602 3 11.068 3 12 3c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 4.602 15 5.068 15 6m4 0H5"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </g>
                                <path d="M9.5 10l.5 7.5m4.5-7.5l-.5 7.5" stroke="currentColor" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_489_191523">
                                    <path fill="currentColor" d="M0 0H24V24H0z"/>
                                </clipPath>
                                <clipPath id="clip1_489_191523">
                                    <path fill="currentColor" d="M0 0H24V24H0z"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <label htmlFor={bannerid} id={bannerlabelid}>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/devshop-data.appspot.com/o/users%2FSPkD1UYkP3akz5mLRKwg30SvQTu2%2Fbanner.jpeg?alt=media&token=458f8342-0b60-4a22-b64a-d2e5099d6ad5"
                            alt="Banner"/>
                    </label>
                    <h4>BANNER<br/><p>.IMG/.JPEG/.WEBP</p></h4>
                </div>
                <br/>
                <label className="sell-cont-label-txt setts-cont-label-txt" htmlFor={usernameid}>
                    <h3>USERNAME</h3>
                    <h4>Your username</h4>
                </label>
                <input id={usernameid} type="text" placeholder="@my_awesome_username" value={username}
                       onChange={e => {
                           setUsername(e.target.value)
                           if (resetBannerUrl || !banner) {
                               document.getElementById(bannerlabelid).children[0].src = "https://source.boringavatars.com/marble/500/" + e.target.value + "?colors=000000,FFFFFF,0E26EA,B700FF,FF0000&square"
                           }
                       }}/>
                <br/><br/>
                <label className="sell-cont-label-txt setts-cont-label-txt" htmlFor={githubid}>
                    <h3>GITHUB</h3>
                    <h4>Your GitHub username</h4>
                </label>
                <input id={githubid} type="text" placeholder="@my_github_username" value={github}
                       onChange={e => setGithub(e.target.value)}/>
                <br/><br/>
                <label className="sell-cont-label-txt setts-cont-label-txt" htmlFor={bioid}>
                    <h3>BIO</h3>
                    <h4>Tell others about yourself</h4>
                </label>
                <input id={bioid} type="text" placeholder="@my_great_bio" value={bio}
                       onChange={e => setBio(e.target.value)}/>
                <br/><br/>
                <label className="sell-cont-label-txt setts-cont-label-txt" htmlFor={countryid}>
                    <h3>COUNTRY</h3>
                    <h4>The country you are living in</h4>
                </label>
                <input id={countryid} type="text" placeholder="@my_country" value={country}
                       onChange={e => setCountry(e.target.value)}/>
                <br/>
                <button className="primary" onClick={e => {
                    if (username && username !== "" && checkValid(username) && bio !== "" && checkValid(bio)) {
                        e.target.innerText = "LOADING..."
                        updateProfile(e)
                    } else if (!username || username === "" || !checkValid(username)) {
                        document.getElementById(usernameid).style.borderColor = "red"
                        setTimeout(() => {
                            document.getElementById(usernameid).style.borderColor = null
                        }, 2000)
                    } else if (!bio || bio === "" || !checkValid(bio)) {
                        document.getElementById(bioid).style.borderColor = "red"
                        setTimeout(() => {
                            document.getElementById(bioid).style.borderColor = null
                        }, 2000)
                    }
                }}>SAVE
                </button>
            </div>
        </>
    )
}