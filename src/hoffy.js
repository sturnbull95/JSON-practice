// hoffy.js
const fs = require('fs');
function prod(...arguments){
  if(arguments.length === 0){
    return undefined;
  }
  return arguments.reduce(function(product,currentNumber){
    return product * currentNumber;
  });

}

function any(arr, fn){
  let returnVal = false;
  return arr.reduce(function(num,currentNum){
    if(fn(currentNum) === true){
      returnVal = true;
    }
    if(fn(currentNum) !== true && returnVal !== true){
      returnVal = false;
    }

    return returnVal;
  });
}

function maybe(fn){
  return function(...args){
    let placeHolder = true;
    let returnVal = "";
    args.map(function(element){
      if(element === null || element === undefined){
        placeHolder = false;
        returnVal = undefined;
      }
      if(element !== null && element !== undefined && placeHolder !== false){
        returnVal = fn(...args);
      }
    });
    return returnVal;
  };
  }

function constrainDecorator(fn, min, max){
  //console.log(arguments.length);
  let bool = true;
  let num = "";
  if(arguments.length < 3){
    bool = false;
  }
  if(arguments[1] === null || arguments[1] === undefined){
    bool = false;
  }
  if(arguments[2] === null || arguments[2] === undefined){
    bool = false;
  }
  return function(...arguments){
      if(bool === false){
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
    };
}

function limitCallsDecorator(fn,n){
  let count = 0;
  let returnVal = "";
  return function(...args){
      if(count < n){
        returnVal = fn(...args);
        count++;
      }
      else{
        returnVal = undefined;
      }
    return returnVal;
  };
}

function mapWith(fn){
  return function(...args){
    const arr = [];
    console.log("outputting mapwith contents\n");
    console.log(args);
    args.map(function(element){
      // if(typeof(element) === "string"){
      //   arr.push(fn(element));
      // }
      // else{
        element.map(function(ele){
          arr.push(fn(ele));
        });
      //}
    });
    console.log("arr");
    console.log(typeof(arr));
    console.log(arr);
    return arr;
  };
}


function simpleINIParse(s){
  var arr = s.split(/[\r,\n]+/);
  console.log(arr);
  let obj = {};
  let value = "";
  arr.map(function(element){
    const singleArr = element.split('=');
    if(singleArr.length === 2){
      const name = singleArr[0];
      value = singleArr[1];
      obj[name] = value;
    }
  });
  console.log("INI-----");
  console.log(obj);
  return obj;
}

function readFileWith(fn){
  const newFn = mapWith(fn);
  return function(fileName,callback){
    console.log("outside");
    fs.readFile(fileName,'utf8',function(err,data){
      if(err){
        console.log("error");
        data = undefined;
        callback();
      }
      data = (newFn([data]))[0];
      callback(err,data);
    });
  };
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
};
