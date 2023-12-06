import './Home.css'
import Home1 from "./assets/home_1.png"
import Home2 from "./assets/home_2.png"

function Home() {

  return (
    <>
        <h1 className="buy-code-sell">CODE.<br/>BUY.<br/>SELL.</h1>
        <img src={Home1} className="img1" alt="def fib(n)"/>
        <img src={Home2} className="img2" alt="main() {}"/>
        <p className="one-catchphrase">{"// 01 - CATCHPHRASE"}</p>
        <p className="one-desc">Devshop allows anyone to buy or sell code snippets.<br/>
            With DEVSHOP, you can easily share your code, and explore
            the marketplace to find the code you need.</p>
        {/*</ul>*/}
    </>
  )
}

export default Home
