import './Home.css'
import Home1 from "./assets/home_1.png"
import Home2 from "./assets/home_2.png"
import Logo from "./assets/navlogo.svg?react"


function Home() {
  return (
    <>
        <h1 className="buy-code-sell">CODE.<br/>BUY.<br/>SELL.</h1>
        <img src={Home1} className="img1" alt="def fib(n)" id="img1"/>
        <img src={Home2} className="img2" alt="main() {}"/>
        <p className="one-catchphrase">{"// 01 - CATCHPHRASE"}</p>
        <p className="one-desc"><Logo className="one-desc-logo"/> allows anyone to buy or sell code snippets.<br/>
            With <Logo className="one-desc-logo"/>, you can easily share your code, and explore
            the marketplace to find the code you need.</p>
    </>
  )
}

export default Home
