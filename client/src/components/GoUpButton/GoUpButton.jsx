import { useEffect, useState } from "react";
import arrow from "../../assets/arrow.png"

export default function GoUpButton() {
    const [showUp, setShowUp] = useState("0");
    const [display, setDisplay] = useState("none")

    useEffect(() => {
        if (display !== "none") {
            window.onscroll = function () {
                let scroll = window.scrollY;
                if (scroll < 300) setShowUp("0");
                if (scroll >= 300) setShowUp("1");
            }
        } else {
            setTimeout(() => setDisplay(""), 1000)
        }
    }, [display]);

    const goUp = () => {
        window.scroll(0, 0);
    }

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <button
            className="button is-rounded" style={{ disaplay: display, position: "fixed", right: 80, bottom: 90, transition: "0.5s", scale: showUp }}
            onClick={goUp}>
            <span class="icon">
                <img className="is-rounded" src={arrow} alt="" />
            </span>
        </button>
    )
}