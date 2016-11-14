export default function GameState() {
    this.lost = false;
    this.pattern = [1];
    this.playback = false;
    this.user = {
        idx : 0
    };
};

GameState.prototype = {

    update : function(delta) {
        if(this.playback) {
            this.playSteps(delta);
        }
    },

    addToPattern : function() {
        this.pattern.push(Math.floor(4 * Math.random()) + 1);
    },

    userPlay : function(pad) {
        if(this.pattern[this.user.idx] !== pad) {
            this.lost = true;

            return;
        }

        this.user.idx++;

        this.addToPattern();

        this.playback = true;
    },

    playSteps : function(delta) {
        let period = 400,
            thresh = period / 3;

        // first light
        if(!this.lit) {
            this.lit = {
                idx : 0,
                dur : 0
            }

            this.alight = this.pattern[this.lit.idx];

            return;
        }

        this.lit.dur += delta;

        if(this.lit.dur >= thresh) {
            this.alight = 0;
        } else {
            this.alight = this.pattern[this.lit.idx];
        }

        if(this.lit.dur >= period) {
            this.lit.idx++;
            this.lit.dur = 0;

            // end of lights
            if(this.lit.idx === this.pattern.length) {
                delete this.lit;
                this.playback = false;
            }
        }
    }
}
