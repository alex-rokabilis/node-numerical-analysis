module.exports = {
    matrix_multiplication: function(a, b) {

        var n = a.length,
            result = [];

        for (var i = 0; i < a.length; i++) {

            var new_row = [];
            for (var k = 0; k < a[i].length; k++) {

                var temp = 0;
                for (var j = 0; j < a[i].length; j++) {
                    temp += a[i][j] * b[j][k];
                };
                if (!isNaN(temp)) new_row.push(temp);
            };
            result.push(new_row);

        }
        return result;
    },
    transpose: function(A) {
        var B = [];
        for (var i = 0; i < A.length; i++) {
            for (var j = 0; j < A[i].length; j++) {
                if (!(B[j] instanceof Array)) B[j] = [];
                B[j][i] = A[i][j]
            };
        };
        return B;
    },
    display: function(A) {
        A.forEach(function(row) {
            console.log(row);
        })
        console.log("")
    },

    substitution_from_top: function(A, B) {

        var solution = [];
        for (var i = 0; i < A.length; i++) {
            var sum = 0;
            for (var j = 0; j < i; j++) {
                sum += A[i][j] * solution[j][0];
            };
            solution.push([(B[i][0] - sum) / A[i][j]]);
        };
        return solution;
    },

    substitution_from_bottom: function(A, B) {

        var solution = [];
        for (var i = A.length - 1; i >= 0; i--) {

            var sum = 0;
            for (var j = A.length - 1; j > i; j--) {
                sum += A[i][j] * solution[j][0];
            };
            solution[j] = [];
            solution[j][0] = (B[i][0] - sum) / A[i][j];
        };
        return solution;
    },

    matrix_clone: function(matrix) {
        var result = [];
        for (var i = 0; i < matrix.length; i++) {
            result[i] = Array.from(matrix[i]);
        };
        return result;
    },



    create_monadiaios: function(n) {
        var x = [];
        for (var i = 0; i < n; i++) {
            x[i] = [];
            for (var j = 0; j < n; j++) {
                x[i][j] = i == j ? 1 : 0;
            };
        };
        return x;
    }

};
