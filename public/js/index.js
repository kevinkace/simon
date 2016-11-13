"use strict";

let state = {
    color  : "red",
    acc    : 0,
    alight : false,
    light  : {}
};

const get = require("lodash/get"),
      m   = require("mithril"),

    addLight = function() {
        // first click
        if(!state.light.count) {
            state.light.count = 1;

            return;
        }

        state.light.count++;
    },

    pulseLight = function() {
        if(state.light.lit) {
            return;
        }

        state.light.lit = {
            idx : 0,
            dur : 0
        };
    },

    updateLight = function(delta) {
        let dur = 300,
            lit = 100,

            idx;

        if(!state.light.count || !state.light.lit) {
            state.alight = false;

            return;
        }

        // done light queue
        if(state.light.lit.idx >= state.light.count) {
            delete state.light.lit;
            state.alight = false;

            return;
        }

        state.light.lit.dur += delta;

        // end of light, next
        if(state.light.lit.dur > dur) {
            state.alight = false;
            state.light.lit.dur = 0;
            state.light.lit.idx++;

            return;
        }

        // check if light on or off, (waiting for next)
        if(state.light.lit.dur < lit) {
            state.alight = true;
        } else {
            state.alight = false;
        }

    },

    comp = {
        view : () => m("div", {
            style : `background: ${state.alight ? state.color : ""}`,
            onclick : () => {
                addLight();
                pulseLight();
            }
        }, state.content)
    },

    MainLoop = require("mainloop.js"),

    update = function(delta) {
        state.content = Math.floor(Date.now()/1000);

        updateLight(delta);
    },

    draw = function() {
        m.redraw();
    };

m.mount(document.body, comp);

MainLoop.setUpdate(update).setDraw(draw).start();

window.ML = MainLoop;
window.state = state;
