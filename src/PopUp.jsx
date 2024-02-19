import "./PopUp.css"


export function ShowPopUp(content) {
    document.getElementById("popup").innerHTML = content
    document.getElementById("popup").style.bottom = "15px"
    document.getElementById("popup").style.opacity = "1"
    document.getElementById("popup").style.filter = "none"
    setTimeout(() => {
        document.getElementById("popup").style.bottom = null
        document.getElementById("popup").style.opacity = null
        document.getElementById("popup").style.filter = null
    }, 450 * content.trim().split(/\s+/).length)

}

export default function PopUp() {
    return (
        <>
            <div className="popup" id="popup">
                Reload the page to see all changes apply
            </div>
        </>
    )
}