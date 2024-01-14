import "./AccountSettings.css"
import {useEffect, useId, useState} from "react";
import Loading from "./Loading.jsx";
import {auth, db, userdb} from "./firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {doc, updateDoc} from "firebase/firestore";

export default function AccountSettings() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState(null)

    const [banner, setBanner] = useState(null)
    const [username, setUsername] = useState("")
    const [github, setGithub] = useState("")
    const [bio, setBio] = useState("")
    const [country, setCountry] = useState("")

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
        }
    }, [userData])

    function updateProfile(e) {
        updateDoc(doc(db, "users", userData.id), {
            username: username,
            github: github,
            bio: bio,
            country: country
        }).then(() => {
            e.target.innerText = "SAVED ✅"
            setTimeout(() => {
                e.target.innerText = "SAVE"
            }, 2500)
        })
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
            <h1 className="pg-heading" id="pg-heading">SETTINGS</h1>
            <h2 className="pg-subtitle">MODIFY YOUR ACCOUNT SETTINGS</h2>
            <div className="srch-cont setts-cont">
                <h2>PROFILE</h2>
                <div className="setts-bnr">
                    <input type="file" style={{display: "none"}} id={bannerid} onChange={e => {
                        setBanner(e.target.files[0])
                        var selectedFile = e.target.files[0];
                        var reader = new FileReader();
                        var imgtag = document.getElementById(bannerlabelid).children[0];

                        reader.onload = function (event) {
                            imgtag.src = event.target.result;
                        };

                        reader.readAsDataURL(selectedFile);

                        document.getElementById(bannerlabelid).children[0].src = userData.banner

                    }}/>
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
                       onChange={e => setUsername(e.target.value)}/>
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
                    <h4>Your short biography</h4>
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
                    e.target.innerText = "LOADING..."
                    updateProfile(e)
                }}>SAVE
                </button>
            </div>
        </>
    )
}