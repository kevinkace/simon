import m from "mithril";

import css from "./pads.css";

const pads = [ 1, 2, 3, 4 ];

function clickPad(state, pos, e) {
    let value;

    value = e.currentTarget.getAttribute("data-value");

    state.gameState.userPlay({
        pad : parseInt(value, 10),
        pos : {
            x : e.pageX - pos.x,
            y : e.pageY - pos.y
        }
    });
}

export default {
    oninit : (vnode) => {
        vnode.state.pos = {};
    },
    oncreate : (vnode) => {
        vnode.state.pos = {
            x : vnode.dom.offsetLeft,
            y : vnode.dom.offsetTop
        };
    },
    view : (vnode) => {
        let state = vnode.attrs.state;

        return m("section", { class : css.pads },
            pads.map((pad) => {
                let attrs = {
                        class        : css.button,
                        "data-value" : pad
                    },
                    ripples = [];

                if(state.gameState) {
                    if(state.gameState.playback) {
                        attrs.disabled = "disabled";
                    }

                    ripples = state.gameState.ripples.filter((ripple) => ripple.pad === pad);

                    // if(state.gameState.alight === pad) {
                    //     attrs.class = css[`padAlight_${pad}`];
                    // }

                    attrs.onclick = clickPad.bind(null, state, {
                        x : vnode.state.pos.x,
                        y : vnode.state.pos.y
                    });
                }

                return m("div", { class : css[`quad_${pad}`] },
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
