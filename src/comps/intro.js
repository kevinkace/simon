    import m from "mithril";

import css from "./intro.css";

import button from "./button";

export default {
    view : (vnode) =>
        m("div", {
                class : css.intro
            },
            m(button, {
                attrs : {
                    onclick : () => {
                        vnode.attrs.state.newGame = true;
                    },
                    oncreate : (vnode) => {
                        window.addEventListener("keydown", (e) => {
                            if(e.keyCode !== 32) {
                                return;
                            }

                            vnode.dom.dispatchEvent(new MouseEvent("click"));
                        }, { once : true })
                    }
                },
                text : "play"
            })
        )
};
