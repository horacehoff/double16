import './Home.css'

function Home() {

  return (
    <>
        <h1>
            CODE. BUY. SELL
        </h1>
        <input type="text" placeholder="@email"/>
        <br/><br/>
        <button className="primary">CLICK ME</button>
        <br/><br/>
        <button className="accent">CLICK ME ACCENT</button>
        <br/><br/>
        <a className="action-text">Action text</a>
        <br/><br/>
        <button className="action">PAGE_ACTION_BTN</button>
        <br/><br/>
        <select>
            <option>
                SELECT
            </option>
        </select>
    </>
  )
}

export default Home
