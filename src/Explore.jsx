import "./Explore.css"
import {Link} from "react-router-dom";

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
            <Link to="/explore">
                <button className="action pg-action">🔍 SEARCH</button>
            </Link>
        </>
    )
}