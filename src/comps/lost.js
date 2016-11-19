import m from "mithril";

import overlay from "./overlay";
import button from "./button";

export default {
    view : (vnode) => {
        let state = vnode.attrs.state;

        return m(overlay, vnode.attrs.state,
            m(button, {
                attrs : {
                    onclick : (vnode) => {
                        state.newGame = true;
                    }
                },
                text : "play again?"
            })
        )
    }
};
