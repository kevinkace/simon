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
            pads.map((pad) => {
                let attrs = {
                    class        : css[`pad_${pad}`],
                    "data-value" : pad
                };

                if(state.gameState) {
                    if(state.gameState.playback) {
                        attrs.disabled = "disabled";
                    }

                    if(state.gameState.alight === pad) {
                        attrs.class = css[`padAlight_${pad}`];
                    }

                    attrs.onclick = clickPad.bind(null, state);
                }

                return m("button", attrs, pad);
            })
        )
    }
};
