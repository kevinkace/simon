import m from "mithril";

import css from "./button.css";

export default {
    view : (vnode) =>
        m("button",
            Object.assign({
                    class : css.button
                },
                vnode.attrs
            ),
            vnode.children
        )
};
