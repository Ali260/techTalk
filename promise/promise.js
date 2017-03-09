/*
*  Basic Javascript promise implementation attempt
*  
*  All the best mate! :D
*
*  @auther: Li Xu
*/
function LendiPromise(fn) {
	var status = 'PENDING';
	var value = undefined;
	var scheduler = [];
	
	var resolve = function(result) {
		status = 'FULFILLED';
		value = result;
		scheduler.map(function(thenFun){
			if(status === 'FULFILLED') thenFun.resolve(value);
			if(status === 'REJECTED') thenFun.reject(value);
		})
	}
	
	var reject = function(error) {
		this.status = 'REJECTED';
		this.value = error;
	}
	
	this.then = function(thenResolve, thenReject) {

		return new LendiPromise(function(resolve, reject) {
			if(status === 'FULFILLED') resolve(thenResolve(value));
			if(status === 'REJECTED') reject(thenReject(value));
			if(status === 'PENDING') scheduler.push({
				resolve: function(value) {resolve(thenResolve(value))},
				reject: function(value) {reject(thenReject(value))}
			});
			
		});
	}
	
	fn(function(result){resolve(result);}, function(error){reject(error);});
}