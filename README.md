# node-numerical-analysis

A set of numerical analysis tools written in node.js

##Methods included:
* Find root of a function ([Check the theory](https://en.wikipedia.org/wiki/Root-finding_algorithm))
  * Partition method
  * Newton Raphson method
  * Secant method
* Find an approach of a function ([Check the theory](https://en.wikipedia.org/wiki/Least_squares))
  * Lagrange method
  * Minimum Square method
  * Secant method
* Find integral of a function ([Check the theory](https://en.wikipedia.org/wiki/Integral))
  * Trapezoid method
  * Simpson's method
* Matrix tools
  * Matrix multiplication
  * Matrix transpose
  * Pretty print of matrix
  * P*A = L*U transformation for matrix ([Check the theory](https://en.wikipedia.org/wiki/LU_decomposition))
  * Gauss Siedel method for solving A*x=b ([Check the theory](https://en.wikipedia.org/wiki/Gauss%E2%80%93Seidel_method))


###Example for root finding

```javascript
var root_finding_methods = require('./lib/root_finding_methods');

var f = function(x) {
  //represent your function in JS
  //for example f(x) = x^2 - 12 
  //would be
  
  return Math.pow(x,2) - 12
}
//you know there is a root between 0 and 5 but not so sure of the exact value!
//so declare the intervals
var interval = [{
	a: 0,
	b: 5
}]
//remember this is a root aproach method so the solution
//will probably have an error
var margin_of_error = 0.001;
//this will limit the error so the first 3 digits will be correct
//small margin of error will cause higher itterations and more time!

var solutions = root_finding_methods.partition(f,interval,margin_of_error);

console.log("\nRoot finding with partition method");
solutions.forEach(solution=>{
	console.log("Solution: x=%d with %d itterations and f(%d)=%d",solution.x,solution.itterations,solution.x,f(solution.x))
})

```

>This will print
```
Root finding with partition method
Solution: x=3.46313 with 12 itterations and f(3.46313)=-0.006730603099999399
```
Which is pretty close! But as you see the first three digits are correct.



##Example for function approach

```javascript
var function_approach_methods = require('./lib/function_approach_methods');

//this is your sample set
//this of course is just the values of x^2
//but it could be anything
var data = [{
		x:0,
		y:0
	},{
		x:1,
		y:1
	},{
		x:2,
		y:4
	},{
		x:3,
		y:9
	},{
		x:4,
		y:16
	}
]
var function_approach = function_approach_methods.lagrange(data);
console.log("\nFunction approach with lagrange method");
console.log("Sample data f(%d)=%d , f(%d)=%d , f(%d)=%d",data[0].x,data[0].y,data[1].x,data[1].y,data[2].x,data[2].y);
console.log("Test data f(%d)=%d , f(%d)=%d , f(%d)=%d",6,function_approach(6),10,function_approach(10),11,function_approach(11));

```
>This will print
```
Function approach with lagrange method
Sample data f(0)=0 , f(1)=1 , f(2)=4
Test data f(6)=36 , f(10)=100 , f(11)=121
```
Which is pretty awesome! With just 5 sample data we made a representation of x^2. 


