export default function GameState() {
    this.pattern = [1];
    this.playback = false;
};

GameState.prototype = {
    addToPattern : function() {
        this.pattern.push(Math.floor(4 * Math.random()) + 1);
    },

    playSteps : function(delta) {
        let period = 400,
            thresh = 150;

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
