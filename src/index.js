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

const comp = {
        view : () => [
            m("div", { class : css.ticker }, state.ticker),
            state.scene
        ]
    },

    update = function(delta) {
        state.ticker = Math.floor(Date.now()/1000);
    },

    draw = function() {
        m.redraw();
    };

m.mount(document.body, comp);

MainLoop.setUpdate(update).setDraw(draw).start();

window.ML = MainLoop;
window.state = state;
