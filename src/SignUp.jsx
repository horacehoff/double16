import "./SignUp.css"

export default function SignUp() {
    return (
        <>
            <form className="sign-form">
                <h1>SIGN_UP</h1>
                <input type="text" placeholder="@username" name="username" required autoComplete="off"/><br/>
                <input type="text" placeholder="@email" name="email" required autoComplete="off"/><br/>
                <input type="text" placeholder="@password" name="psw" required autoComplete="off"/><br/>
                <button type="submit" className="primary">SIGN UP</button>
            </form>
        </>
    )
}