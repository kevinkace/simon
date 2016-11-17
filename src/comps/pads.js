import m from "mithril";

import css from "./pads.css";

const pads = [ 1, 2, 3, 4 ];

function clickPad(state, e) {
    let value = e.currentTarget.getAttribute("data-value"),
        rect  = e.currentTarget.getBoundingClientRect(),
        pad   = parseInt(value, 10),

        x = e.pageX - rect.left,
        y = e.pageY - rect.top;

    if(e.pageX === 0 && e.pageY === 0) {
        x = rect.width / 2;
        y = rect.height /2;
    }

    state.gameState.userPlay(pad);

    ripple(state, {
        pad : pad,
        x   : x,
        y   : y
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
    oncreate : (vnode) => {
        let state = vnode.attrs.state;
        if(state.gameState) {
            window.addEventListener("keydown", (e) => {
                if(e.keyCode in state.gameState.keyMappings) {
                    let button = vnode.dom.children[state.gameState.keyMappings[e.keyCode]].children[0],
                        event  = new MouseEvent('click', {
                            view       : window,
                            bubbles    : true,
                            cancelable : true
                        });

                    button.dispatchEvent(event);
                }
            });
        }
    },
    view : (vnode) => {
        let state  = vnode.attrs.state;

        state.ui.ripples = state.ui.ripples || [];

        return m("section", { class : css.pads },
            // state.gameState ?
            //     m("div", { class : css.length }, state.gameState.pattern.length) :
            //     null,
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
