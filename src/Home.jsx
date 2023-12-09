import './Home.css'
import Home1 from "./assets/home_1.png"
import Home2 from "./assets/home_2.png"
import Logo from "./assets/navlogo.svg?react"
import {useEffect, useId} from "react";


function Home() {
    const img1id = useId()
    const img2id = useId()
    const codeid = useId()
    const buyid = useId()
    const sellid = useId()


    let has_run = false
    useEffect(() => {
        // 3D code rotate effect
        let constrain = 1000;
        let mouseOverContainer = document.getElementById("root");
        let ex1Layer = document.getElementById(img1id);
        let ex2Layer = document.getElementById(img2id);

        function transforms(x, y, el) {
            let box = el.getBoundingClientRect();
            let calcX = -(y - box.y - (box.height / 2)) / constrain;
            let calcY = (x - box.x - (box.width / 2)) / constrain;

            return "perspective(100px) "
                + "   rotateX(" + calcX + "deg) "
                + "   rotateY(" + calcY + "deg) ";
        }

        function transformElement(el, xyEl) {
            el.style.transform = transforms.apply(null, xyEl);
        }

        mouseOverContainer.onmousemove = function (e) {
            let xy = [e.clientX, e.clientY];
            let position = xy.concat([ex1Layer]);
            let position2 = xy.concat([ex2Layer]);

            window.requestAnimationFrame(function () {
                transformElement(ex1Layer, position);
                transformElement(ex2Layer, position2);
            });
        };

        mouseOverContainer.onmouseleave = function () {
            ex1Layer.style.transition = "1s"
            ex2Layer.style.transition = "1s"
            ex1Layer.style.transform = "none"
            ex2Layer.style.transform = "none"
            setTimeout(() => {
                ex1Layer.style.transition = "0.15s"
                ex2Layer.style.transition = "0.15s"
            }, 1000)
        }


        if (!has_run) {
            has_run = true
            // TEXT INTRO EFFECT
            let code = document.getElementById(codeid)
            let buy = document.getElementById(buyid)
            let sell = document.getElementById(sellid)
            let code_initial = code.innerHTML
            let buy_initial = buy.innerHTML
            let sell_initial = sell.innerHTML

            // eslint-disable-next-line no-inner-declarations
            function random_str(len) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                while (result.length < len) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return result
            }

            // eslint-disable-next-line no-inner-declarations
            async function text_matrix(element, initial) {
                element.innerHTML = random_str(5)
                const timer = ms => new Promise(res => setTimeout(res, ms))
                let remaining = initial.length - 1
                let typed = ""
                for (const char of initial) {
                    typed = typed + char
                    element.innerHTML = typed + random_str(remaining)
                    remaining -= 1
                    await timer(100);
                }
            }

            text_matrix(code, code_initial)
            text_matrix(buy, buy_initial)
            text_matrix(sell, sell_initial)
        }
    }, [])
    return (
        <>
            <h1 className="buy-code-sell"><span id={codeid}>CODE.</span><br/><span id={buyid}>BUY.</span><br/><span
                id={sellid}>SELL.</span></h1>
            <div id="rotate-container">
                <img src={Home1} className="img1" alt="def fib(n)" id={img1id}/>
                <img src={Home2} className="img2" alt="main() {}" id={img2id}/>
            </div>
            <p className="one-catchphrase">{"// 01 - CATCHPHRASE"}</p>
            <p className="one-desc"><Logo className="one-desc-logo"/> allows anyone to buy or sell code snippets.<br/>
                With <Logo className="one-desc-logo"/>, you can easily share your code, and explore
                the marketplace to find the code you need.</p>
        </>
    )
}

export default Home
