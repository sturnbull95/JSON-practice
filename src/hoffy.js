// hoffy.js

function prod(num1){
  if(arguments.length == 0){
    return undefined;
  }
  return [].reduce.call(arguments,function(product,currentNumber){
    return product * currentNumber;
  });

}

function any(arr, fn){
  var returnVal = false;
  return arr.reduce(function(num,currentNum){
    if(fn(currentNum) == true){
      returnVal = true;
    }
    if(fn(currentNum) != true && returnVal != true){
      returnVal = false;
    }

    return returnVal;
  });
}

function maybe(fn){
  return function(...args){
    var placeHolder = true;
    args.map(function(element){
      if(element == null || element == undefined){
        placeHolder = false;
        returnVal = undefined;
      }
      if(element != null && element != undefined && placeHolder != false){
        returnVal = fn(...args);
      }
    });
    return returnVal;
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
  return function(...args){
    args.map(function(element){
      if(count < n){
        returnVal = fn(...args);
        count++;
      }
      else{
        returnVal = undefined;
      }
    });
    return returnVal;
  }
}

function mapWith(fn){
  return function(...args){
    var arr = [];
    args.map(function(element){
      element.map(function(ele){
        arr.push(fn(ele));
      });
    });
    return arr;
  }
}

function simpleINIParse(s){
  var arr = s.split(/\r?\n/);
  var obj = {};
  var value = "";
  arr.map(function(element){
    var singleArr = element.split('=');
    if(singleArr.length == 2){
      var name = singleArr[0];
      value = singleArr[1];
      obj[name] = value;
    }
  });
  console.log(obj);
  return obj;
}

function readFileWith(fn){
  
}

module.exports = {
    prod: prod,
    any: any,
    maybe: maybe,
    constrainDecorator: constrainDecorator,
    limitCallsDecorator: limitCallsDecorator,
    mapWith: mapWith,
    simpleINIParse: simpleINIParse,
    readFileWith: readFileWith
}
