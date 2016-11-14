import m from "mithril";

import css from "./pads.css";

const pads = [ 1, 2, 3, 4 ];

function clickPad(state, e) {
    let value = e.currentTarget.getAttribute("data-value"),
        rect  = e.currentTarget.getBoundingClientRect();

    state.gameState.userPlay({
        pad : parseInt(value, 10),
        pos : {
            x : e.pageX - rect.left,
            y : e.pageY - rect.top
        }
    });
}

export default {
    view : (vnode) => {
        let state  = vnode.attrs.state;

        return m("section", { class : css.pads },
            pads.map((pad) => {
                let ripples = [],
                    alight  = null,
                    attrs   = {
                        class        : css.button,
                        "data-value" : pad,
                        onclick      : (e) => e.preventDefault()
                    };

                if(state.gameState) {
                    if(state.gameState.playback) {
                        attrs.disabled = "disabled";

                        if(state.gameState.alight === pad) {
                            alight = m("span", { class : css.alight });
                        }
                    }

                    ripples = state.gameState.ripples.filter((ripple) => ripple.pad === pad);

                    attrs.onclick = clickPad.bind(null, state);
                }

                return m("div", { class : css[`quad_${pad}`] },
                    alight,
                    ripples.map((ripple) => m("span", {
                        class : css.ripple,
                        style : `left: ${ripple.pos.x}px; top: ${ripple.pos.y}px;`
                    })),
                    m("button", attrs, pad)
                );
            })
        )
    }
};
