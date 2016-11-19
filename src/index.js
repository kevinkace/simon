import m from "mithril";
import MainLoop from "mainloop.js";

import css from "./index.css";

import scenes from "./scenes";

import GameState from "./GameState";

let state = {
    scenes : scenes,
    ui     : {
        update : () => null
    },
    keyMappings : {
        103 : 0,
        105 : 1,
        97  : 2,
        99  : 3
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
        // debug
        state.ticker = Math.floor(Date.now()/1000);

        // for ripples etc
        state.ui.update(delta);

        // not a new game and no gameState
        if(!state.newGame && !state.gameState) {
            return;
        }

        // first game or start new game
        if(state.newGame || (state.gameState && state.gameState.newGame)) {
            state.newGame = false;
            state.scene = state.scenes.game;

            state.gameState = new GameState();
        }

        // in game
        if(state.gameState) {
            // but lost
            if(state.gameState.lost) {
                state.scene = state.scenes.lost;
                return;
            }

            state.gameState.update(delta);
        }
    };

m.mount(document.body, comp);

MainLoop.setUpdate(update).setDraw(m.redraw).start();

window.ML = MainLoop;
window.state = state;

// Stop/start processing with focus
// assuming perf wins without profiling :+1:
// window.addEventListener("blur", () => {
//     MainLoop.stop();
// })

// window.addEventListener("focus", () => {
//     MainLoop.start();
// })
