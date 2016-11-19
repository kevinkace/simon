    import m from "mithril";

import css from "./intro.css";

import overlay from "./overlay";
import button from "./button";

export default {
    view : (vnode) =>
        m(overlay,
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
