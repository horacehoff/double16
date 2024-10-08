import "./Create.css"
import {useEffect, useId, useState} from "react";
import {languages_list} from "./lang.jsx";
import {getDownloadURL, getStorage, ref, uploadBytes, uploadString} from "firebase/storage";
import {app, db, userdb} from "./firebase.js"
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {useNavigate, useParams} from "react-router-dom";
import {decrypt, encrypt} from "./encrypt.js";
import {compressToBase64, decompressFromBase64} from "lz-string";
import Loading from "./Loading.jsx";
import {renderToString} from "react-dom/server";
import {ShowPopUp} from "./PopUp.jsx";


export default function EditCodePage() {
    const navcodeid = useParams().codeid

    const navigate = useNavigate()

    const sellcont = useId()

    const errorid = useId()

    const nameid = useId()
    const [name, setName] = useState("")
    const catchphraseid = useId()
    const [catchphrase, setCatchphrase] = useState("")
    const bannerid = useId()
    const bannerlabelid = useId()
    const bannerlabelspanid = useId()
    const [banner, setBanner] = useState()


    const descid = useId()
    const [desc, setDesc] = useState("")

    const languageid = useId()
    const [language, setLanguage] = useState("C")
    const codeid = useId()
    const [code, setCode] = useState("")

    const priceid = useId()
    const [price, setPrice] = useState(0)

    const publishbtnid = useId()

    const storage = getStorage(app);


    function pxpercent() {
        // Create a clone of the body style to avoid affecting the actual body style
        let bodyStyle = document.body.style.cssText;

        // Set the body style to 100% width temporarily
        document.body.style.width = '100%';

        // Get the client width of the body
        let width = document.body.clientWidth;

        // Restore the original body style
        document.body.style.cssText = bodyStyle;

        // Return the width
        return width;
    }

    const [codedata, setCodeData] = useState(null)


    const [isRun, setIsRun] = useState(false)
    if (!isRun) {
        setIsRun(true)
        console.log(navcodeid)
        const codeRef = doc(db, "codesnippets", navcodeid);
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
        if (codedata && userdb && userdb.id === codedata.authorid) {
            setName(codedata.title)
            setCatchphrase(codedata.catchphrase)
            setDesc(codedata.desc)
            setLanguage(codedata.codeLanguage)
            let decrypted_code = decompressFromBase64(codedata.code)
            let key = codedata.id + "-" + codedata.crypto + "-" + codedata.id
            decrypted_code = decrypt(decrypted_code, key)
            setCode(decrypted_code)
            setPrice(codedata.price)
        } else if (codedata && userdb && userdb.id !== codedata.authorid) {
            navigate("/404")
        } else if (codedata && !userdb) {
            navigate("/404")
        }
    }, [codedata, userdb])

    useEffect(() => {
        let width = window.innerWidth
        const listen = () => {
            if (!document.getElementById(sellcont)) {
                window.removeEventListener("resize", listen, true)
            }
            if (document.getElementById(sellcont).scrollLeft > 0 && window.innerWidth > width) {
                document.getElementById(sellcont).scrollLeft = pxpercent() * Math.round(document.getElementById(sellcont).scrollLeft / width)
            } else if (document.getElementById(sellcont).scrollLeft > 0 && window.innerWidth < width && Math.round(document.getElementById(sellcont).scrollLeft / width) === 1) {
                document.getElementById(sellcont).scrollLeft = pxpercent()
            }
            width = window.innerWidth;
        }
        window.addEventListener("resize", listen, true)
    }, []);


    const gofwd = () => {
        document.getElementById(sellcont).scroll({
            left: document.getElementById(sellcont).scrollLeft + pxpercent(), behavior: "smooth"
        })
    }
    const gobkwd = () => {
        document.getElementById(sellcont).scroll({
            left: document.getElementById(sellcont).scrollLeft - pxpercent(), behavior: "smooth"
        })
    }

    function checkValid(str) {
        return /\S/.test(str) && str !== "";
    }

    async function update() {
        if (checkValid(name) && checkValid(catchphrase) && checkValid(desc) && checkValid(code)) {
            let update_date = Date.now()
            if (banner) {
                const bannerRef = ref(storage, 'codesnippets/' + codedata.id + "/banner/banner.webp");
                await uploadBytes(bannerRef, banner).then(async () => {
                    await getDownloadURL(bannerRef).then(async (url) => {
                        console.log("done")
                        await updateDoc(doc(db, "codesnippets", codedata.id), {
                            title: name,
                            catchphrase: catchphrase,
                            desc: desc,
                            bannerUrl: url,
                            codeLanguage: language,
                            code: compressToBase64(encrypt(code, codedata.id + "-" + codedata.crypto + "-" + codedata.id)),
                            updated: update_date,
                            char: code.match(/\S/g).length,
                            lines: code.split(/\r|\r\n|\n/).length,
                            price: 0
                        })
                    })
                })
            } else {
                await updateDoc(doc(db, "codesnippets", codedata.id), {
                    title: name,
                    catchphrase: catchphrase,
                    desc: desc,
                    bannerUrl: codedata.bannerUrl,
                    codeLanguage: language,
                    code: compressToBase64(encrypt(code, codedata.id + "-" + codedata.crypto + "-" + codedata.id)),
                    updated: update_date,
                    char: code.match(/\S/g).length,
                    lines: code.split(/\r|\r\n|\n/).length,
                    price: 0
                })
            }
            const storage = getStorage();
            getDownloadURL(ref(storage, 'sitemap.txt'))
                .then((url) => {
                    let storedText;

                    fetch(url)
                        .then(function (response) {
                            response.text().then(function (text) {
                                storedText = text;
                                storedText = storedText.replace(codedata.id + "###" + codedata.updated, codedata.id + "###" + update_date)
                                const storageRef = ref(storage, 'sitemap.txt');
                                console.log("did it!!!!!")

                                uploadString(storageRef, storedText).then(() => {
                                    navigate("/code/" + codedata.id)
                                    window.location.reload()
                                })
                            });
                        });
                })

        }
    }
    if (codedata === null) {
        return (
            <>
                <Loading/>
            </>
        )
    }

    return (<>
        <h1 className="pg-heading" id="pg-heading">EDIT</h1>
        <h2 className="pg-subtitle sell-subtitle" style={{marginBottom: "-40px"}}>EDIT A CODE SNIPPET</h2>
        <ul className="sell-cont" id={sellcont}>
            <li className="sell-cont-part">
                <div>
                    <br/>
                    {/*<p id={errorid} className="error-notice sell-error-notice">ERROR: BANNER FILE TOO BIG (MAX:*/}
                    {/*    250kB)</p>*/}
                    <label className="sell-cont-label-txt" htmlFor={nameid}>
                        <h3>NAME</h3>
                        <h4>A good, and preferably short name for your code snippet</h4>
                    </label>
                    <input type="text" placeholder="@awesome_name" id={nameid} value={name}
                           onChange={e => setName(e.target.value)}/>
                    <br/><br/>
                    <label className="sell-cont-label-txt" htmlFor={catchphraseid}>
                        <h3>CATCHPHRASE</h3>
                        <h4>A quick, short, and concise description for your code snippet</h4>
                    </label>
                    <input type="text" placeholder="@good_catchphrase" id={catchphraseid} value={catchphrase}
                           onChange={e => setCatchphrase(e.target.value)}/>
                    <br/><br/>
                    <label className="sell-cont-label-txt sell-cont-label-txt-banner" htmlFor={bannerid}>
                        <h3>BANNER</h3>
                        <h4>A new banner for your code snippet</h4>
                    </label>
                    <label className="sell-cont-banner-upload" htmlFor={bannerid} id={bannerlabelid}>
                        <input type="file" accept="image/*" id={bannerid} value={""}
                               onChange={e => {
                                   if (e.target.files[0].size / 1024 < 250) {
                                       setBanner(e.target.files[0])
                                       let url = URL.createObjectURL(e.target.files[0])
                                       document.getElementById(bannerlabelid).style.paddingLeft = "6px"
                                       document.getElementById(bannerlabelid).style.paddingRight = "10px"
                                       document.getElementById(bannerlabelspanid).innerHTML = renderToString(<>
                                           <img alt="Uploaded banner image" src={url} style={{
                                               width: "auto",
                                               height: "30px",
                                               verticalAlign: "-45%",
                                               borderRadius: "4px",
                                               position: "relative"
                                           }}/> UPLOAD BANNER
                                       </>)
                                   } else {
                                       console.log(e.target.files[0].size / 1024 + " kB")
                                       // document.getElementById(errorid).style.opacity = "1"
                                       // setBanner(undefined)
                                       // setTimeout(() => document.getElementById(errorid).style.opacity = "0", 2000)
                                       setBanner(undefined)
                                       ShowPopUp("ERROR: Banner file too big (MAX: 250kB)")
                                   }
                               }}/>
                        <span id={bannerlabelspanid}><svg fill="none" viewBox="0 0 24 24" width="1.2em" height="1.2em"
                                                          xmlns="http://www.w3.org/2000/svg">
                            <g stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                                <path
                                    d="M18 9.222c1.657 0 3 1.393 3 3.111A3.134 3.134 0 0 1 19.546 15M18 9.222C19.2 5.667 16.2 3 12.9 3S7.05 5.667 7.5 7.667M18 9.222c-.67 0-1.29.229-1.79.615a3.025 3.025 0 0 0-.46.438M10.188 10a3.933 3.933 0 0 0-.32-.606C9.195 8.353 8.05 7.667 6.75 7.667 4.679 7.667 3 9.407 3 11.556c0 1.407.72 2.64 1.8 3.322"/>
                                <path d="M12 22v-7.5m0 0l-3 3m3-3l3 3" strokeLinejoin="round"/>
                            </g>
                        </svg>
                        UPLOAD BANNER</span>
                    </label>
                    <br/><br/><br/>
                    <button className="primary sell-cont-nav-btn" onClick={() => {
                        if (checkValid(name) && checkValid(catchphrase)) {
                            gofwd()
                        } else {
                            if (!checkValid(name)) {
                                document.getElementById(nameid).style.borderColor = "red"
                                setTimeout(() => {
                                    document.getElementById(nameid).style.borderColor = null
                                }, 2000)
                            }
                            if (!checkValid(catchphrase)) {
                                document.getElementById(catchphraseid).style.borderColor = "red"
                                setTimeout(() => {
                                    document.getElementById(catchphraseid).style.borderColor = null
                                }, 2000)
                            }
                            if (!banner) {
                                document.getElementById(bannerlabelid).style.borderColor = "red"
                                setTimeout(() => {
                                    document.getElementById(bannerlabelid).style.borderColor = null
                                }, 2000)
                            }
                        }
                    }}>DESCRIPTION 👉
                    </button>
                </div>
            </li>
            <li className="sell-cont-part sell-cont-part-desc">
                <div>
                    <label className="sell-cont-label-txt" htmlFor={descid}>
                        <h3>DESCRIPTION</h3>
                        <h4>A longer, more precise description for your code snippet</h4>
                    </label>
                    {/*<textarea placeholder="@great_description" id={descid}/>*/}
                    {/*<div className="sell-cont-mdeditor">*/}
                    {/*<MarkdownEditor value="Hello Markdown!" />*/}
                    <textarea placeholder="@great_description" id={descid} className="sell-cont-mdeditor"
                              value={desc} onChange={e => setDesc(e.target.value)}/>
                    {/*</div>*/}
                    <br/>
                    <button className="primary sell-cont-nav-btn" onClick={gobkwd}>👈 GENERAL INFO
                    </button>
                    <button className="primary sell-cont-nav-btn" onClick={() => {
                        if (checkValid(desc)) {
                            gofwd()
                        } else {
                            document.getElementById(descid).style.borderColor = "red"
                            setTimeout(() => document.getElementById(descid).style.borderColor = null
                                , 2000)
                        }
                    }}>CODE 👉
                    </button>
                </div>
            </li>
            <li className="sell-cont-part">
                <div>
                    <label className="sell-cont-label-txt" htmlFor={languageid}>
                        <h3>LANGUAGE</h3>
                        <h4>The language of the code below</h4>
                    </label>
                    <select id={languageid} value={language} onChange={e => setLanguage(e.target.value)}>
                        {languages_list.map((item, index) => (<option key={index} value={item}>
                            {item}
                        </option>))}
                    </select>
                    <br/><br/>
                    <label className="sell-cont-label-txt" htmlFor={codeid}>
                        <h3>CODE</h3>
                        <h4>{"Your snippet's code"}</h4>
                    </label>
                    <textarea className="sell-cont-code" id={codeid} value={code}
                              onChange={e => setCode(e.target.value)}></textarea>
                    <br/><br/>
                    <label className="sell-cont-label-txt" htmlFor={priceid}>
                        <h3>PRICE</h3>
                        <h4>The price of your code snippet</h4>
                    </label>
                    <input className="sell-cont-price" type="number" placeholder="@price" id={priceid} value={price}
                           onChange={e => {
                               let to_set = e.target.value.replace(/^0+/, "")
                               if (e.target.value > 100) {
                                   to_set = 100
                               }
                               if (e.target.value < 0 && e.target.value && e.target.value !== 0) {
                                   to_set = 0
                               }
                               if (e.target.value === "" || !e.target.value) {
                                   to_set = 0
                               }
                               if (e.target.value === "0" || e.target.value === 0) {
                                   to_set = 0
                               }
                               setPrice(to_set)
                           }} min="0" step="1" max="100"
                           style={{width: "230px"}}
                    />
                    <p className="sell-cont-price-currency">€</p>
                    <br/><br/>
                    <button className="accent sell-cont-nav-btn" onClick={gobkwd}>👈 DESCRIPTION</button>
                    <br/>
                    <button className="primary sell-cont-nav-btn sell-cont-code-publish" onClick={e => {
                        if (!checkValid(code)) {
                            document.getElementById(codeid).style.borderColor = "red"
                            setTimeout(() => document.getElementById(codeid).style.borderColor = null
                                , 2000)
                        } else {
                            document.getElementById(publishbtnid).innerText = "LOADING..."
                            update()
                        }
                    }} id={publishbtnid}>UPDATE
                    </button>
                </div>
            </li>
        </ul>
    </>)
}