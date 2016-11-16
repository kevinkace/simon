import m from "mithril";
import MainLoop from "mainloop.js";

import css from "./index.css";

import scenes from "./scenes";

import GameState from "./GameState";

let state = {
    scenes : scenes,
    ui     : {
        update : () => null
    }
};

state.scene = state.scenes.intro;

const comp = {
        view : () => [
            m("div", { class : css.ticker }, state.ticker),
            m(state.scene, { state : state })
        ]
    },

    update = function(delta) {
        state.ticker = Math.floor(Date.now()/1000);

        if(!state.newGame && !state.gameState) {
            return;
        }

        if(state.newGame || (state.gameState && state.gameState.newGame)) {
            state.newGame = false;
            state.scene = state.scenes.game;

            state.gameState = new GameState();
        }

        if(state.gameState) {
            state.gameState.update(delta);
        }

        state.ui.update(delta);
    };

m.mount(document.body, comp);

MainLoop.setUpdate(update).setDraw(m.redraw).start();

window.ML = MainLoop;
window.state = state;

// Stop/start processing with focus
// performance without profiling :metal:
// window.addEventListener("blur", () => {
//     MainLoop.stop();
// })

// window.addEventListener("focus", () => {
//     MainLoop.start();
// })
