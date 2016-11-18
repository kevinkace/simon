export default function GameState() {
    this.lost = false;
    this.pattern = [ 1 ];
    this.playback = true;
    this.user = {
        idx : 0
    };
};

GameState.prototype = {
    update : function(delta) {
        if(this.lost) {
            this.newGame = confirm("you lost");
        }

        if(this.playback) {
            this.playSteps(delta);
        }
    },

    addToPattern : function() {
        this.pattern.push(Math.floor(4 * Math.random()) + 1);
    },

    userPlay : function(pad) {
        // clicked wrong pad
        if(this.pattern[this.user.idx] !== pad) {
            this.lost = true;

            return;
        }

        this.user.idx++;

        // user turn over
        if(this.user.idx === this.pattern.length) {
            this.addToPattern();

            this.user.idx = 0;
            this.playback = true;
        }
    },

    playSteps : function(delta) {
        let period = 300,
            delay  = period / 2;

        // first light
        if(!this.lit) {
            this.lit = {
                idx : 0,
                dur : 0,
                del : 300
            }

            return;
        }

        this.lit.del -= delta;

        if(this.lit.del > 0) {
            return;
        }

        this.lit.dur += delta;

        if(this.lit.dur >= delay) {
            this.alight = this.pattern[this.lit.idx];
        } else {
            this.alight = 0;
        }

        if(this.lit.dur >= period) {
            this.lit.idx++;
            this.lit.dur = 0;

            // end of lights
            if(this.lit.idx === this.pattern.length) {
                delete this.lit;
                this.alight = 0;
                this.playback = false;
            }
        }
    }
};
