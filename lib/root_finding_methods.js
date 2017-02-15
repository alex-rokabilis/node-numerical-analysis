module.exports = {
    partition: function(f, diastimata, e) {
        var rizes = [];
        diastimata.forEach(function(diastima) {
            var itterations = 0,
                a = diastima.a,
                b = diastima.b;

            if (f(a) == 0 || f(b) == 0) return rizes.push({
                x: f(a) == 0 ? +a.toPrecision(6) : +b.toPrecision(6),
                diastima: [a, b],
                itterations: itterations
            })
            if (f(a) * f(b) > 0) return rizes.push({
                err: new Error("Ta diastimata den einai sosta :: f(" + a + ")*f(" + b + ")>0"),
                diastima: [a, b]
            });

            while (true) {
                var m = (a + b) / 2,
                    solve = f(m),
                    completed = (Math.abs(b - a) <= e * Math.abs(b));

                itterations++;
                if (solve == 0 || completed) return rizes.push({
                    x: +m.toPrecision(6),
                    diastima: [a, b],
                    itterations: itterations
                })
                if (solve * f(a) < 0) b = m;
                else a = m;
            }
        });
        return rizes;
    },

    newton_raphson: function(f, f_tonos, diastimata, e) {
        var rizes = [];
        diastimata.forEach(function(diastima) {
            var itterations = 0,
                a = diastima.a,
                b = diastima.b,
                x_old = b,
                x_new;

            if (f(a) == 0 || f(b) == 0) return rizes.push({
                x: f(a) == 0 ? +a.toPrecision(6) : +b.toPrecision(6),
                diastima: [a, b],
                itterations: itterations
            })


            while (true) {
                x_new = x_old - f(x_old) / f_tonos(x_old);
                //console.log("***", x_new)
                var solve = f(x_new),
                    completed = (Math.abs(x_new - x_old) <= e * Math.abs(x_new));
                itterations++;

                if (solve == 0 || completed) return rizes.push({
                    x: +x_new.toPrecision(6),
                    diastima: [a, b],
                    itterations: itterations
                })
                x_old = x_new;
            }
        });
        return rizes;
    },

    secant: function(f, diastimata, e) {
        var rizes = [];
        diastimata.forEach(function(diastima) {
            var itterations = 0,
                a = diastima.a,
                b = diastima.b,
                x_old0 = a,
                x_old1 = b,
                x_new;

            if (f(a) == 0 || f(b) == 0) return rizes.push({
                x: f(a) == 0 ? +a.toPrecision(6) : +b.toPrecision(6),
                diastima: [a, b],
                itterations: itterations
            })


            while (true) {
                x_new = x_old1 - (f(x_old1) * (x_old1 - x_old0)) / (f(x_old1) - f(x_old0));

                var solve = f(x_new),
                    completed = (Math.abs(x_new - x_old1) <= e * Math.abs(x_new));
                itterations++;

                if (solve == 0 || completed) return rizes.push({
                    x: +x_new.toPrecision(6),
                    diastima: [a, b],
                    itterations: itterations
                })
                x_old0 = x_old1;
                x_old1 = x_new;
            }
        });
        return rizes;
    }
}