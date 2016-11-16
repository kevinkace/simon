import m from "mithril";

import css from "./pads.css";

const pads = [ 1, 2, 3, 4 ];

function clickPad(state, e) {
    let value = e.currentTarget.getAttribute("data-value"),
        rect  = e.currentTarget.getBoundingClientRect(),
        pad   = parseInt(value, 10);

    state.gameState.userPlay(pad);

    ripple(state, {
        pad : pad,
        x   : e.pageX - rect.left,
        y   : e.pageY - rect.top
    });
}


function update(delta) {
    let dur = 800;

    state.ui.ripples = state.ui.ripples.filter((ripple) => {
            return ripple.dur < dur;
        })
        .map((ripple) => {

            ripple.dur += delta;

            return ripple;
        });
}

function ripple(state, opts) {
    // add to state.ui.ripple
    state.ui.ripples.push({
            pad : opts.pad,
            dur : 0,
            x   : opts.x,
            y   : opts.y
        });

    state.ui.update = update;

}


export default {
    view : (vnode) => {
        let state  = vnode.attrs.state;

        state.ui.ripples = state.ui.ripples || [];

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

                    ripples = state.ui.ripples.filter((ripple) => ripple.pad === pad);

                    attrs.onclick = clickPad.bind(null, state);
                }

                return m("div", { class : css[`quad_${pad}`] },
                    alight,
                    ripples.map((ripple) => m("span", {
                        class : css.ripple,
                        style : `left: ${ripple.x}px; top: ${ripple.y}px;`
                    })),
                    m("button", attrs, pad)
                );
            })
        )
    }
};
