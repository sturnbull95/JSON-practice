// hoffy.js

function prod(num1){
  var result = 1;
  if(arguments.length == 0){
    return undefined;
  }
  for(var i = 0; i < arguments.length; i++){
    result *= arguments[i];
  }
  return result;
}

function any(arr, fn){
  var bool = false;
  while(bool != true){
    for(var i = 0; i < arr.length; i++){
      if(fn(arr[i]) == true){
        bool = true;
      }
    }
  }
  return bool;
}

function maybe(fn){

  return function(...args){
    for(var i = 0; i < arguments.length; i++){
      if(arguments[i] == null || arguments[i] == undefined){
        return undefined;
      }
      else{
        val = fn(...arguments);
      }
    }
    return val;
  }


}

function constrainDecorator(fn, min, max){
  //console.log(arguments.length);
  var bool = true;
  if(arguments.length < 3){
    bool = false;
  }
  if(arguments[1] == null || arguments[1] == undefined){
    bool = false;
  }
  if(arguments[2] == null || arguments[2] == undefined){
    bool = false;
  }
  return function(...arguments){
      if(bool == false){
        num = fn(...arguments);
      }
      if(arguments[0] < min){
        return min;
      }
      if(arguments[0] > max){
        return max;
      }
      else{
        num = fn(...arguments);
      }
      return num;
    }
}

function limitCallsDecorator(fn,n){
  var count = 0;
  return function(...arguments){
    for(var i = 0; i < n; i++){
      if(count < n){
        num = fn(...arguments);
        count++;
      }
      else{
        num = undefined;
      }
      return num;
    }
}

module.exports = {
    prod: prod,
    any: any,
    maybe: maybe,
    constrainDecorator: constrainDecorator

}
