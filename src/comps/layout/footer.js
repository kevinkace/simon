import m from "mithril";

import css from "./footer.css";

export default {
    view : (vnode) => {
        let state = vnode.attrs.state,
            gameState = state.gameState,
            timer = null;

        if(gameState) {
            timer = ((gameState.userTimer.limit - gameState.userTimer.cur) /1000).toFixed(2);
            if(timer < 0) {
                timer = 0;
            }
        }

        return m("footer", { class : css.footer },
            m("div", { class : css.count },
                m("h3", { class : css.countHeader },
                    "steps"
                ),
                m("p", { class : css.countVal },
                    gameState ?
                    gameState.pattern.length :
                    null
                )
            ),
            m("div", { class : css.timer },
                m("div", { class : css.timerBar }),
                m("div", { class : css.timerVal },
                    timer
                )
            ),
            m("div", { class : css.level },
                m("h3", { class : css.levelHeader },
                    "level"
                ),
                m("p", { class : css.levelVal },
                    // hard coded for now
                    1
                )
            )
        );
    }
};
