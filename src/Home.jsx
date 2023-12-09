import './Home.css'
import Home1 from "./assets/home_1.png"
import Home2 from "./assets/home_2.png"
import Logo from "./assets/navlogo.svg?react"
import {useEffect} from "react";


function Home() {
    useEffect(() => {
        let constrain = 1000;
        let mouseOverContainer = document.getElementById("root");
        let ex1Layer = document.getElementById("img1");

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

            window.requestAnimationFrame(function () {
                transformElement(ex1Layer, position);
            });
        };

        mouseOverContainer.onmouseleave = function () {
            ex1Layer.style.transition = "1s"
            ex1Layer.style.transform = "none"
            setTimeout(() => ex1Layer.style.transition = "0.15s", 1000)
            console.log("left")
        }

    })
  return (
    <>
        <h1 className="buy-code-sell">CODE.<br/>BUY.<br/>SELL.</h1>
        <div id="rotate-container">
            <img src={Home1} className="img1" alt="def fib(n)" id="img1"/>
            <img src={Home2} className="img2" alt="main() {}" id="img2"/>
        </div>
        <p className="one-catchphrase">{"// 01 - CATCHPHRASE"}</p>
        <p className="one-desc"><Logo className="one-desc-logo"/> allows anyone to buy or sell code snippets.<br/>
            With <Logo className="one-desc-logo"/>, you can easily share your code, and explore
            the marketplace to find the code you need.</p>
    </>
  )
}

export default Home
