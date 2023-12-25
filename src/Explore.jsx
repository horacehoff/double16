import "./Explore.css"
import {Link} from "react-router-dom";
import CodeCard from "./CodeCard.jsx";
import ShortNumber from "short-number"
import CodePagePreview from "./CodePagePreview.jsx";
import {lua, python} from "./lang.jsx";

export default function Explore() {
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
    return (
        <>
        <h1 className="pg-heading" id="pg-heading">EXPLORE</h1>
        <h2 className="pg-subtitle">EXPLORE ALL THE DIFFERENT CODE SNIPPETS AND FIND THE ONE YOU WANT</h2>
            <Link to="/search">
            <button className="action pg-action">🔍 SEARCH</button>
        </Link>
        <h2 className="pg-section-heading">🔥 TRENDING</h2>
        <ul className="pg-section-list">
            <li>
                <CodeCard pkg={{
                    lang: python,
                    price: "5",
                    like: ShortNumber(1000),
                    dislike: ShortNumber(250),
                    title: "FIBONACCI SEQUENCE CALCULATOR",
                    author: "Just_A_MANGO",
                    desc: "This code is a function which, given a integer n, returns the fibonacci sequence with n length.V2 : OPTIMIZED THE WHOLE THING AND MADE IT",
                    longDesc: "The useId() hook provides a way to generate unique IDs that persist between re-renders. It ensures that generated IDs are unique across the entire React app, and until the component that uses the ID is removed from the DOM. Once the component is re-insterted, the generated ID will be different.\n" +
                        "\n" +
                        "The main purpose of the useId() hook is to generate unique IDs for HTML form elements. It simplifies the process of generating unique IDs when creating form inputs and labels in React.",
                    char: ShortNumber(1500),
                    lines: "3000",
                    banner: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
                }}
                />
            </li>
            <li>
                <CodeCard pkg={{
                    lang: lua,
                    price: "10",
                    like: ShortNumber(1200),
                    dislike: ShortNumber(180),
                    title: "CONCURRENT WEB SERVER WITH ACTIX",
                    author: "RustWebWizard",
                    desc: "Build a high-performance web server using the Actix framework in Rust. This code card demonstrates how to handle concurrent connections and implement basic routing.",
                    longDesc: "The Rust web server utilizes Actix, showcasing Rust's capabilities in building fast and concurrent web applications. It's a valuable resource for Rust enthusiasts.Build a high-performance web server using the Actix framework in Rust. This code card demonstrates how to handle concurrent connections and implement basic routing.Build a high-performance web server using the Actix framework in Rust. This code card demonstrates how to handle concurrent connections and implement basic routing.Build a high-performance web server using the Actix framework in Rust. This code card demonstrates how to handle concurrent connections and implement basic routing.Build a high-performance web server using the Actix framework in Rust. This code card demonstrates how to handle concurrent connections and implement basic routing.Build a high-performance web server using the Actix framework in Rust. This code card demonstrates how to handle concurrent connections and implement basic routing.Build a high-performance web server using the Actix framework in Rust. This code card demonstrates how to handle concurrent connections and implement basic routing.",
                    char: ShortNumber(1800),
                    lines: "800",
                    banner: "https://images.squarespace-cdn.com/content/v1/60c543f3dd587909185f6a3f/1694477079741-L6967US024LDOPHVOOYL/sq-rust-social-banner.jpg"
                }}/>
            </li>

        </ul>
            <CodePagePreview/>
    </>)
}