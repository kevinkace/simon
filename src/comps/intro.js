import m from "mithril";

import css from "./intro.css";

import button from "./button";

export default {
    view : (vnode) =>
        m("div", {
                class : css.intro
            },
            m(button, {
                onclick : () => {
                    vnode.attrs.state.newGame = true;
                }
            }, "play")
        )
};
