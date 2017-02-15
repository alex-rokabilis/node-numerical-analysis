module.exports = {
    trapeziou: function(data, f) {
        var start = data.start,
            end = data.end,
            n = data.n;

        var step = (end - start) / n;
        var next = start;
        var times = [];
        for (var i = 0; i < n + 1; i++) {
            times.push(next);
            next += step
        };

        var res = times.map(function(x) {
            return {
                x: x,
                y: f(x)
            }
        });

        var total = 0;
        for (var i = 0; i < res.length - 1; i++) {
            total += (res[i].y + res[i + 1].y) / 2 * (res[i + 1].x - res[i].x);
        };



        return total;
    },
    simpson: function(data, f) {
        var start = data.start,
            end = data.end,
            n = data.n;

        var step = (end - start) / n;
        var next = start;
        var times = [];
        for (var i = 0; i < n + 1; i++) {
            times.push(next);
            next += step
        };

        var res = times.map(function(x) {
            return {
                x: x,
                y: f(x)
            }
        });

        var N = n;
        var total1 = 0;
        for (var i = 1; i <= N / 2 - 1; i++) {
            total1 += res[2 * i].y
        };
        var total2 = 0;
        for (var i = 1; i <= N / 2; i++) {
            total2 += res[2 * i - 1].y
        };
        return (end - start) / (3 * N) * (res[0].y + res[res.length - 1].y + 2 * total1 + 4 * total2);

    }
}