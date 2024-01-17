const counter = (function counter () {
    let value = 0;
    return{
        getValue: function() {
            return value;
        },
        changeBy: function(k) {
            value += k;
        }
    }
})();