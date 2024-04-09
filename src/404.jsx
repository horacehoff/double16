import "./404.css"
import {Helmet} from "react-helmet";

export default function FourZeroFour() {
    return (
        <>
            <Helmet>
                <title>DOUBLE16 | 404</title>
                <meta content="DOUBLE16 | 404"
                      name="title"/>
                <meta content="404 - The requested page was not found."
                      name="description"/>

                <meta content="https://double16.vercel.app/404" property="og:url"/>
                <meta content="DOUBLE16 | 404" property="og:title"/>
                <meta content="404 - The requested page was not found."
                      property="og:description"/>

                <meta content="https://double16.vercel.app/404" property="twitter:url"/>
                <meta content="DOUBLE16 | 404" property="twitter:title"/>
                <meta content="404 - The requested page was not found."
                      property="twitter:description"/>
            </Helmet>
            <div className="four-cont">
                <h1>404</h1>
                <h2>The page you are looking for does not exist.</h2>
            </div>
        </>
    )
}