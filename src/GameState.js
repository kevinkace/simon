export default function GameState() {
    this.newGame   = true;
    this.lost      = false;
    this.pattern   = [];
    this.padsCount = 4;
    this.playback  = true;
    this.userIdx   = 0;
    this.userTimer = {
        cur   : 0,
        limit : 800
    };
    this.speed     = 5;
    // this.gameType = "rapidPattern";
};

GameState.prototype = {
    update : function(delta) {
        if(this.lost) {
            this.lost = true;

            return;
        }

        if(this.newGame) {
            this.newGame = false;
            this.updatePattern();
        }

        if(this.playback) {
            this.playSteps(delta);
        } else {
            this.updateUserTimer(delta);
        }
    },

    addToPattern : function(num) {
        num = num || 1;

        for(let i = 0; i < num; i++) {
            this.pattern.push(Math.floor(this.padsCount * Math.random()) + 1);
        }
    },

    updatePattern : function() {
        switch(this.gameType) {
            case "rapidPattern" :
                this.pattern = [];
                this.addToPattern(5);
                break;

            default :
                this.addToPattern();
        }
    },

    userPlay : function(pad) {
        this.resetUserTimer();
        // clicked wrong pad
        if(this.pattern[this.userIdx] !== pad) {
            this.lost = true;

            return;
        }

        this.userIdx++;

        // user turn over
        if(this.userIdx === this.pattern.length) {
            this.updatePattern();

            this.userIdx = 0;
            this.playback = true;
        }
    },

    updateUserTimer : function(delta) {
        this.userTimer.cur += delta;

        if(this.userTimer.cur > this.userTimer.limit) {
            this.lost = true;
            return;
        }
    },

    resetUserTimer : function() {
        this.userTimer.cur = 0;
    },

    playSteps : function(delta) {
        let period = 1000 / this.speed,
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
