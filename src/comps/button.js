import m from "mithril";

import css from "./button.css";

export default {
    view : (vnode) => {
            return m("button",
                Object.assign({
                        class : css.button
                    },
                    vnode.attrs.attrs
                ),
                vnode.attrs.text
                    .split("")
                    .map((letter) => m("i", letter))
            )}
};
