import m from "mithril";

import css from "./logo.css";

export default {
    view : (vnode) =>
        m("h1", { class : vnode.attrs.small ? css.smLogo : css.logo }, "Game Name")
};
