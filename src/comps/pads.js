import m from "mithril";

import css from "./pads.css";

const pads = [ 1, 2, 3, 4 ];

export default {
    view : (vnode) => {
        return m("section", { class : css.pads },
            pads.map((pad, idx) =>
                m("button", { class : vnode.attrs.state.gameState.alight === (idx + 1) ? css.padAlight : css.pad }, pad)
            )
        )
    }
};
