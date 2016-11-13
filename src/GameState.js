export default function GameState() {
    this.pattern = [1];
};

GameState.prototype = {
    addToPattern : function() {
        this.pattern.push(Math.floor(4 * Math.random()) + 1);
    }
}
