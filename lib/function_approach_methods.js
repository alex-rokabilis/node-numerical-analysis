var matrix_utils = require('./matrix_utils'),
    system_equations = require('./system_equations_methods');

module.exports = {
    lagrange: function(data) {
        var data_x = data.map(function(d) {
            return d.x;
        });

        var L = data_x.map(function(d, index) {
            return reducer(data_x, index);
        })


        return function(k) {
            var total = 0;
            L.forEach(function(l, index) {
                total += data[index].y * (l.up(k) / l.down);
            });
            return total;
        }


        function reducer(arr, x_start) {
            var total = 1;
            arr.forEach(function(x, index) {
                if (x_start != index) total *= (arr[x_start] - x);
            });
            return {
                up: function(k) {
                    var total = 1;
                    arr.forEach(function(x, index) {
                        if (x_start != index) total *= (k - x);
                    });
                    return total;
                },
                down: total
            }
        }

    },

    min_square: function(data, rank) {
        var A = [],
            B = [];
        data.forEach(function(row, k) {
            A[k] = [];
            for (var i = 0; i <= rank; i++) {
                A[k][i] = Math.pow(row.x, i);
            };
            B.push([row.y]);
        })


        var result = system_equations.PA_LU(matrix_utils.matrix_multiplication(matrix_utils.transpose(A), A), matrix_utils.matrix_multiplication(matrix_utils.transpose(A), B)).X;

        return function(x) {
            var total = 0;
            for (var i = 0; i < result.length; i++) {
                total += Math.pow(x, i) * result[i][0];
            };
            return total;
        };
    }
}