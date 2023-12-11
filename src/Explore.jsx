import "./Explore.css"
import {Link} from "react-router-dom";
import CodeCard from "./CodeCard.jsx";
import ShortNumber from "short-number"

export const cpp = <>
    <svg version="1.1" id="Layer_1" style={{display: "inline-block", position: "relative", top: "4px"}}
         xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         width="21.32px" height="19px" viewBox="0 0 306 344.35" enableBackground="new 0 0 306 344.35">
        <path fill="#00599C" d="M302.107,258.262c2.401-4.159,3.893-8.845,3.893-13.053V99.14c0-4.208-1.49-8.893-3.892-13.052L153,172.175
	L302.107,258.262z"/>
        <path fill="#004482" d="M166.25,341.193l126.5-73.034c3.644-2.104,6.956-5.737,9.357-9.897L153,172.175L3.893,258.263
	c2.401,4.159,5.714,7.793,9.357,9.896l126.5,73.034C147.037,345.401,158.963,345.401,166.25,341.193z"/>
        <path fill="#659AD2" d="M302.108,86.087c-2.402-4.16-5.715-7.793-9.358-9.897L166.25,3.156c-7.287-4.208-19.213-4.208-26.5,0
	L13.25,76.19C5.962,80.397,0,90.725,0,99.14v146.069c0,4.208,1.491,8.894,3.893,13.053L153,172.175L302.108,86.087z"/>
        <g>
            <path fill="#FFFFFF" d="M153,274.175c-56.243,0-102-45.757-102-102s45.757-102,102-102c36.292,0,70.139,19.53,88.331,50.968
		l-44.143,25.544c-9.105-15.736-26.038-25.512-44.188-25.512c-28.122,0-51,22.878-51,51c0,28.121,22.878,51,51,51
		c18.152,0,35.085-9.776,44.191-25.515l44.143,25.543C223.142,254.644,189.294,274.175,153,274.175z"/>
        </g>
        <g>
            <polygon fill="#FFFFFF" points="255,166.508 243.666,166.508 243.666,155.175 232.334,155.175 232.334,166.508 221,166.508
		221,177.841 232.334,177.841 232.334,189.175 243.666,189.175 243.666,177.841 255,177.841 	"/>
        </g>
        <g>
            <polygon fill="#FFFFFF" points="297.5,166.508 286.166,166.508 286.166,155.175 274.834,155.175 274.834,166.508 263.5,166.508
		263.5,177.841 274.834,177.841 274.834,189.175 286.166,189.175 286.166,177.841 297.5,177.841 	"/>
        </g>
    </svg>
    <span style={{display: "inline-block"}}>C++</span>
</>

// export const python = <>
//
// </>

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
        <h2 className="pg-section-heading">🔥 TRENDING</h2>
        <ul className="pg-section-list">
            <li>
                <CodeCard lang="🐍PYTHON" price="5" like={ShortNumber(1000)} title="FIBONACCI SEQUENCE CALCULATOR"
                          author="Just_A_MANGO" desc="This code is a function which, given a integer n, returns the fibonacci sequence with n length.
                        V2 : OPTIMIZED THE WHOLE THING AND MADE IT"
                          char={ShortNumber(1500)} lines="3000"
                />
            </li>
            <li>
                <CodeCard lang="🐍PYTHON" price="5" like={ShortNumber(1000)} title="FIBONACCI SEQUENCE CALCULATOR"
                          author="Just_A_MANGO" desc="This code is a function which, given a integer n, returns the fibonacci sequence with n length.
                        V2 : OPTIMIZED THE WHOLE THING AND MADE IT"
                          char={ShortNumber(1500)} lines="3000"
                />
            </li>
            <li>
                <CodeCard lang="🐍PYTHON" price="5" like={ShortNumber(1000)} title="FIBONACCI SEQUENCE CALCULATOR"
                          author="Just_A_MANGO" desc="This code is a function which, given a integer n, returns the fibonacci sequence with n length.
                        V2 : OPTIMIZED THE WHOLE THING AND MADE IT"
                          char={ShortNumber(1500)} lines="3000"
                />
            </li>
            <li>
                <CodeCard lang="🐍PYTHON" price="5" like={ShortNumber(1000)} title="FIBONACCI SEQUENCE CALCULATOR"
                          author="Just_A_MANGO" desc="This code is a function which, given a integer n, returns the fibonacci sequence with n length.
                        V2 : OPTIMIZED THE WHOLE THING AND MADE IT"
                          char={ShortNumber(1500)} lines="3000"
                />
            </li>
            <li>
                <CodeCard lang="🐍PYTHON" price="5" like={ShortNumber(1000)} title="FIBONACCI SEQUENCE CALCULATOR"
                          author="Just_A_MANGO" desc="This code is a function which, given a integer n, returns the fibonacci sequence with n length.
                        V2 : OPTIMIZED THE WHOLE THING AND MADE IT"
                          char={ShortNumber(1500)} lines="3000"
                />
            </li>
            <li>
                <CodeCard lang="🐍PYTHON" price="5" like={ShortNumber(1000)} title="FIBONACCI SEQUENCE CALCULATOR"
                          author="Just_A_MANGO" desc="This code is a function which, given a integer n, returns the fibonacci sequence with n length.
                        V2 : OPTIMIZED THE WHOLE THING AND MADE IT"
                          char={ShortNumber(1500)} lines="3000"
                />
            </li>
            <li>
                <CodeCard lang={cpp} price="5" like={ShortNumber(1000)} title="PI CALCULATOR"
                          author="Just_A_MANGO" desc="Calculates the PI number to the Nth decimal"
                          char={ShortNumber(1500)} lines="3000"
                />
            </li>
        </ul>
    </>)
}