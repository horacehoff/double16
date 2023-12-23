import "./SignUp.css"
import {Link} from "react-router-dom";

export default function SignUp() {
    return (
        <>
            <form className="sign-form">
                <h1>SIGN_UP</h1>
                <input type="text" placeholder="@username" name="username" autoComplete="username"/><br/>
                <input type="email" placeholder="@email" name="email" autoComplete="email"/><br/>
                <input type="password" placeholder="@password" name="psw" autoComplete="new-password"/><br/>
                <button type="submit" className="primary" onClick={e => {
                    e.preventDefault()
                }}>SIGN UP
                </button>
                <br/>
                <Link to="/" className="action-text">I ALREADY HAVE AN ACCOUNT</Link>
            </form>
        </>
    )
}