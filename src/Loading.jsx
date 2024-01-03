import Favicon from "./assets/favicon.svg?react";
import "./Loading.css"

export default function Loading() {
    return (
        <>
            <div className="codeloading">
                <Favicon/>
                <h3>LOADING<span></span></h3>
            </div>
        </>
    )
}