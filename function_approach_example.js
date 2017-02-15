var function_approach_methods = require('./lib/function_approach_methods');


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


var function_approach = function_approach_methods.min_square(data,4);
console.log("\nFunction approach with min_square method");
console.log("Sample data f(%d)=%d , f(%d)=%d , f(%d)=%d",data[0].x,data[0].y,data[1].x,data[1].y,data[2].x,data[2].y);
console.log("Test data f(%d)=%d , f(%d)=%d , f(%d)=%d",6,function_approach(6),10,function_approach(10),11,function_approach(11));
