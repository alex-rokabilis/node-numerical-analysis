var root_finding_methods = require('./lib/root_finding_methods');


var f = function(x){
	return Math.pow(x,2) - 8*x +12 ;
}
var f_derivative = function(x){
	return 2*x - 8;
}
var intervals = [{
	a: 0,
	b: 3
},{
	a: 3,
	b: 7
}];
var margin_of_error = 0.001;

var solutions = root_finding_methods.partition(f,intervals,margin_of_error);

console.log("\nRoot finding with partition method");
solutions.forEach(solution=>{
	console.log("Solution: x=%d with %d itterations and f(%d)=%d",solution.x,solution.itterations,solution.x,f(solution.x))
})


var solutions = root_finding_methods.secant(f,intervals,margin_of_error);

console.log("\nRoot finding with secant method");
solutions.forEach(solution=>{
	console.log("Solution: x=%d with %d itterations and f(%d)=%d",solution.x,solution.itterations,solution.x,f(solution.x))
})


var solutions = root_finding_methods.newton_raphson(f,f_derivative,intervals,margin_of_error);

console.log("\nRoot finding with newton_raphson method");
solutions.forEach(solution=>{
	console.log("Solution: x=%d with %d itterations and f(%d)=%d",solution.x,solution.itterations,solution.x,f(solution.x))
})