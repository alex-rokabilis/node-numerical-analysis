var matrix_utils = require('./matrix_utils');

function PA_LU(A_original, B) {
    var A = matrix_utils.matrix_clone(A_original);
    var n = A.length;

    var ALL_L = [];
    var ALL_P = [];

    for (var k = 0; k < n; k++) {
        var L = matrix_utils.create_monadiaios(n),
            max = undefined,
            max_row = undefined;

        //find the row with the maximum number
        for (var i = k; i < n; i++) {
            if (!max || Math.abs(max) < Math.abs(A[i][k])) {
                max = A[i][k];
                max_row = i;
            }
        }
        //swap the maximum column with the current
        //of table A and also table P
        //add P in the ALL_P list
        if (max_row != k) {
            var temp = A[k]
            A[k] = A[max_row];
            A[max_row] = temp;
            var P = matrix_utils.create_monadiaios(n);
            temp = P[k]
            P[k] = P[max_row];
            P[max_row] = temp;
            ALL_P.push(P)

        } else {
            ALL_P.push(matrix_utils.create_monadiaios(n));
        }

        //make the necesarry modifications
        //in table A so there will be zeros
        //also do the same in L with negative sign
        //finally add L in the ALL L list
        for (var i = k + 1; i < n; i++) {

            var polaplasiastis = A[i][k] / A[k][k];
            for (var j = 0; j < n; j++) {
                A[i][j] -= A[k][j] * polaplasiastis;
                L[i][j] += L[k][j] * polaplasiastis;
            };

        };
        ALL_L.push(L);
    };

    function recu(i, arr) {
        if (i == undefined) i = arr.length - 1;
        if (i == 0) return arr[i];
        return matrix_utils.matrix_multiplication(recu(i - 1, arr), arr[i]);
    }




    var p_total;

    //calculate the multiplication of ALL P from reverse
    //so we have the final P
    for (var i = ALL_P.length - 1; i >= 0; i--) {
        if (!p_total)
            p_total = matrix_utils.matrix_multiplication(ALL_P[i], ALL_P[--i]);
        else
            p_total = matrix_utils.matrix_multiplication(p_total, ALL_P[i]);

    };


    var temp = [p_total];
    for (var i = 0; i < ALL_P.length; i++) {
        temp.push(ALL_P[i]);
        temp.push(ALL_L[i]);
    };


    //U is the outcome of all the above modifications in A matrix
    var U = A;
    var L = recu(temp.length - 1, temp);
    var P = p_total;

    var Y = matrix_utils.substitution_from_top(L, matrix_utils.matrix_multiplication(P, B))
    var X = matrix_utils.substitution_from_bottom(U, Y);
    return {
        P: P,
        A: A_original,
        L: L,
        U: U,
        Y: Y,
        X: X,
        "P*A": matrix_utils.matrix_multiplication(P, A_original),
        "L*U": matrix_utils.matrix_multiplication(L, U)
    };

}


function gauss_siedel(A, B, err) {

    var x = [],
        m = 0,
        n = A[0].length;

    x[m] = Array(n).fill(0);

    while (true) {
        x[++m] = [];
        for (var i = 0; i < n; i++) {

            var sum1 = 0,
                sum2 = 0;

            for (var j = 0; j < i; j++) {
                sum1 += A[i][j] * x[m][j];
            };
            for (var j = i + 1; j < n; j++) {
                sum2 += A[i][j] * x[m - 1][j];
            };

            x[m][i] = (1 / A[i][i]) * (B[i][0] - sum1 - sum2);
        };

        var norm_old = Math.max.apply(null, x[m - 1].map(Math.abs));
        var norm_new = Math.max.apply(null, x[m].map(Math.abs));

        if (Math.abs(norm_new - norm_old) <= err) return x[m].map(function(z) {
            return [z]
        });

    }


}

module.exports = {
    PA_LU: PA_LU,
    Gauss_Siedel: gauss_siedel
}