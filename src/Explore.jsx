import "./Explore.css"
import {Link, useNavigate} from "react-router-dom";
import CodeCard from "./CodeCard.jsx";
import ShortNumber from "short-number"
import CodePagePreview from "./CodePagePreview.jsx";
import {getLanguageName} from "./lang.jsx";
import {useState} from "react";
import {collection, doc, getDocs, limit, orderBy, query, setDoc} from "firebase/firestore";
import {db, userdb} from "./firebase.js";
import {compressToBase64} from "lz-string";
import {encrypt} from "./encrypt.js";
import {v1} from "uuid";

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
            <Link to="/search">
                <button className="action pg-action">🔍 SEARCH</button>
            </Link>
            <button onClick={() => {
                const uuid = v1()
                let test = "use std::io::{stdout, Write}; use ****%%%%%%crossterm::{style::{Color, Attribute, SetAttribute, SetForegroundColor, ResetColor}, queue, cursor::MoveTo}; use crate::{util::GLOBAL_PIXEL_DATA, access_pixel_data}; /// A `Pixel` is a struct with three fields: `x`, `y`, and `color`. /// /// The `x` and `y` fields are both unsigned 16-bit integers. The `color` field is a `Color` type. /// /// The `Color` type is defined in the `crossterm` crate. /// /// Properties: /// /// * `x`: The x coordinate of the pixel. /// * `y`: The y coordinate of the pixel. /// * `color`: The color of the pixel. #[derive(Debug, Clone, Copy)] pub struct Pixel { pub x: u16, pub y: u16, pub color: Color, } /// Takes a position, a color, a string and an optional vector of attributes and draws the string to /// the terminal /// /// Arguments: /// /// * `x`: u16, y: u16 - The position of the text on the terminal /// * `y`: The y coordinate of the pixel /// * `color`: The color of the text /// * `text`: The text to be drawn /// * `attribute`: This is an optional vector of attributes that you can apply to the text. pub fn draw_text_to_terminal(x: u16, y: u16, color:Color, text: &str, attribute: Option<Vec<Attribute>>) { if x > 150 || y > 50 { panic!(\"Text position exceeds terminal limit (150;50) - x: {}, y: {}\", x, y) } for attr in attribute.iter() { for a in attr.iter() { queue!(stdout(), SetAttribute(*a)).unwrap(); } } queue!( stdout(), MoveTo(x, y), SetForegroundColor(color), crossterm::style::Print(text), ResetColor, SetAttribute(Attribute::Reset) ).expect(\"Failed to draw to terminal\"); stdout().flush().unwrap() } /// Takes a position and a color, and draws a pixel to the terminal /// /// Arguments: /// /// * `x`: u16, y: u16 - The position of the pixel on the terminal /// * `y`: u16, x: u16, color:Color /// * `color`: The color of the pixel. pub fn draw_to_terminal(x: u16, y: u16, color:Color) { if x > 150 || y > 50 { panic!(\"Pixel position exceeds terminal limit (150;50) - x: {}, y: {}\", x, y) } GLOBAL_PIXEL_DATA.lock().unwrap().push(Pixel { x, y, color }); queue!( stdout(), MoveTo(x, y), SetForegroundColor(color), crossterm::style::Print(\"█\"), ResetColor ).expect(\"Failed to draw to terminal\"); stdout().flush().unwrap() } pub fn draw_vector_to_terminal(pixels: Vec<Pixel>) { for pixel in pixels { draw_to_terminal(pixel.x, pixel.y, pixel.color); } } pub fn erase_pixel(x: u16, y: u16) { if x > 150 || y > 50 { panic!(\"Pixel position exceeds terminal limit (150;50) - x: {}, y: {}\", x, y) } GLOBAL_PIXEL_DATA.lock().unwrap().retain(|pxl| pxl.x != x && pxl.y != y); queue!( stdout(), MoveTo(x, y), crossterm::style::Print(\" \"), ).expect(\"Failed to erase pixel\"); stdout().flush().unwrap() } /// Loops through all the pixels in the pixel data, and if the pixel is within the specified area, it /// draws a space character to the terminal, effectively erasing the pixel. /// /// Arguments: /// /// * `x1`: The x coordinate of the top left corner of the area to be erased. /// * `y1`: The y coordinate of the top left corner of the area to be erased. /// * `x2`: The x coordinate of the bottom right corner of the area to be erased. /// * `y2`: The y coordinate of the bottom right corner of the area to be erased. pub fn erase_pixel_area(x1: u16, y1: u16, x2: u16, y2: u16) { for pxl in access_pixel_data!() { if pxl.x >= x1 && pxl.x <= x2 && pxl.y >= y1 && pxl.y <= y2 { queue!( stdout(), MoveTo(pxl.x, pxl.y), crossterm::style::Print(\" \") ).expect(\"Failed to draw to terminal\"); } } }"
                const cryptouuid = crypto.randomUUID()
                setDoc(doc(db, "codesnippets", uuid), {
                    title: "TRM-ENGINE",
                    catchphrase: "A WIP lightweight and fast game engine which runs in the terminal",
                    desc: "trm-engine is a game engine designed to run in the terminal, providing a simple and lightweight platform for developing terminal-based games.\n" +
                        "\n" +
                        "Key Features:\n" +
                        "- Object Management: The engine includes an object management system, allowing for easy creation, manipulation, and movement of game objects within the terminal window.\n" +
                        "- Size/Performance: The engine offers good performance with a very small bundled size, making it accessible to a wide variety of people and platforms.\n" +
                        "\n" +
                        "trm-engine provides a simple and flexible platform for creating games in the terminal, making it ideal for hobbyist game developers or those looking to learn game development concepts in a lightweight and accessible manner.",
                    bannerUrl: "https://firebasestorage.googleapis.com/v0/b/double-16.appspot.com/o/codesnippets%2Fbecb0690-a96d-11ee-9ee8-63ae085ccc1e%2Fbanner%2Fbanner.webp?alt=media&token=5e58bf99-1ce0-4399-b1ef-0b5fe2fc00ce",
                    codeLanguage: "Rust",
                    code: compressToBase64(encrypt(test, uuid + "-" + cryptouuid + "-" + uuid)),
                    id: uuid,
                    authorid: userdb.id,
                    authorusername: "Just_a_Mango",
                    likes: [],
                    dislikes: [],
                    created: Date.now(),
                    updated: Date.now(),
                    char: test.match(/\S/g).length,
                    lines: test.split(/\r|\r\n|\n/).length,
                    crypto: cryptouuid,
                    price: 0,
                    downloads: []
                })
            }}>DUMMY CREATE
            </button>
            <br/>
            <h2 className="pg-section-heading">🏆 MOST DOWNLOADED</h2>

            {/*PROTOTYPE-1*/}
            {/*<button className="pg-section-btn">+ <span>VIEW MORE</span></button>*/}
            <button className="pg-section-btn">{more_svg}</button>

            <ul className="pg-section-list">
                {section_items(mostDownloaded)}
            </ul>
            <br/>
            <h2 className="pg-section-heading">🔥 TRENDING</h2>
            <button className="pg-section-btn">{more_svg}</button>
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