import m from "mithril";

import css from "./overlay.css";

export default {
    view : (vnode) =>
        m("div", { class : css.overlay }, vnode.children)
};