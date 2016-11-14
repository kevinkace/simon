import m from "mithril";

import css from "./pads.css";

const pads = [ 1, 2, 3, 4 ];

function clickPad(state, e) {
    let value;

    if(state.gameState.playback) {
        return;
    }

    value = e.currentTarget.getAttribute("data-value");

    state.gameState.userPlay(parseInt(value, 10));
}

export default {
    view : (vnode) => {
        let state = vnode.attrs.state;

        return m("section", { class : css.pads },
            pads.map((pad, idx) => {
                let attrs = {
                    onclick : clickPad.bind(null, state),
                    class   : state.gameState.alight === (idx + 1) ?
                        css.padAlight :
                        css.pad,
                    "data-value" : pad
                };

                if(state.gameState.playback) {
                    attrs.disabled = "disabled";
                }

                return m("button", attrs, pad);
            })
        )
    }
};
