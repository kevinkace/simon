import m from "mithril";
import MainLoop from "mainloop.js";

import css from "./index.css";

import scenes from "./scenes";

import GameState from "./GameState";

let state = {
    scenes    : scenes,
    gameState : new GameState()
};

state.scene = state.scenes.intro;
state.gameState.playback = true;

const comp = {
        view : () => [
            m("div", { class : css.ticker }, state.ticker),
            m(state.scene, { state : state })
        ]
    },

    update = function(delta) {
        state.ticker = Math.floor(Date.now()/1000);

        if(state.gameState.playback) {
            state.gameState.playSteps(delta);
        }
    },

    draw = function() {
        m.redraw();
    };

m.mount(document.body, comp);

MainLoop.setUpdate(update).setDraw(draw).start();

window.ML = MainLoop;
window.state = state;
