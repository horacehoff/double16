import CodeCard from "./CodeCard.jsx";
import {getLanguageName} from "./lang.jsx";
import ShortNumber from "short-number";

export const section_items = (data, navigate) =>
    <>
        {
            data.length === 0 ? (
                    <>
                        <li>
                            <div className="pg-section-list-placeholder"></div>
                        </li>
                        <li>
                            <div className="pg-section-list-placeholder"></div>
                        </li>
                    </>
                ) :
                data.map((codesnippet, index) =>
                    <li key={index} onClick={() => {
                        document.getElementById("lnk").href = "/code/" + codesnippet.id
                        document.getElementById("lnk").onclick = (e) => {
                            e.preventDefault()
                            document.getElementById("root").style.pointerEvents = "all"
                            navigate("/code/" + codesnippet.id)
                        }
                        document.getElementById("aut").href = "/users/" + codesnippet.authorid
                        document.getElementById("aut").onclick = (e) => {
                            e.preventDefault()
                            document.getElementById("root").style.pointerEvents = "all"
                            navigate("/" + codesnippet.authorusername)
                        }
                    }}>
                        <CodeCard pkg={{
                            lang: getLanguageName(codesnippet.codeLanguage),
                            price: codesnippet.price,
                            downloads: ShortNumber(codesnippet.downloads.length),
                            likes: ShortNumber(codesnippet.likes.length),
                            dislike: ShortNumber(codesnippet.dislikes.length),
                            title: codesnippet.title,
                            author: codesnippet.authorusername,
                            desc: codesnippet.catchphrase,
                            longDesc: codesnippet.desc,
                            char: ShortNumber(codesnippet.char),
                            lines: ShortNumber(codesnippet.lines),
                            banner: codesnippet.bannerUrl,
                            id: codesnippet.id
                        }}
                        />
                    </li>
                )
        }
    </>