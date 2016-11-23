import m from "mithril";

import logo from "../logo";

import css from "./header.css";

const nav = [{
        href : "/options",
        text : "options"
    }];

export default {
    view : (vnode) =>
        m("header", { class : css.header },
            m("div", { class : css.logo },
                m(logo, { small : true })
            ),
            m("div", { class : css.hMenu },
                m("button", {
                        class   : css.button,
                        onclick : () => console.log("do some shit")
                    },
                    "show nav"
                ),
                m("nav", { class : css.nav },
                    nav.map((navItem) =>
                        m("a", {
                            href    : navItem.href,
                            onclick : (e) => console.log("other shit")
                        }, navItem.text)
                    )
                )
            )
        )
}