import m from "mithril";

import header from "./header";
import footer from "./footer";

import css from "./index.css";

export default {
    view : (vnode) =>
        m("div", { class : css.layout },
            m(header),
            m("section", { class : css.section }, vnode.children),
            m(footer, vnode.attrs)
        )
};
