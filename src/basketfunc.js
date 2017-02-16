// basketfunc.js

function processGameData(obj){
  obj = obj.g;
  let msg = "";
  let countPoints = 0;
  let countReb = 0;
  msg += "Game ID: " + obj.gid + ", " + obj.gdte + "\n";
  msg += "=====\n";

  //fgm = field goal made
  obj.hls.pstsg.forEach(function(ele){
    countPoints += ele.tpm*3;
    countPoints += (ele.fgm - ele.tpm)*2;
    countPoints += ele.ftm;
  });
  msg += (obj.hls.tc + " " + obj.hls.tn + " - " + countPoints + "\n");
  countPoints = 0;
  obj.vls.pstsg.forEach(function(ele){
    countPoints += ele.tpm*3;
    countPoints += (ele.fgm - ele.tpm)*2;
    countPoints += ele.ftm;
  });
  msg += (obj.vls.tc + " " + obj.vls.tn + " - " + countPoints + "\n");

  //rebounds
  let name = "";
  let tempCount = 0;
  obj.hls.pstsg.forEach(function(ele){
    countReb = 0;
    countReb += ele.oreb;
    countReb += ele.dreb;
    if(countReb > tempCount){
      tempCount = countReb;
      name = ele.fn + " " + ele.ln;
    }
  });
  obj.vls.pstsg.forEach(function(ele){
    countReb = 0;
    countReb += ele.oreb;
    countReb += ele.dreb;
    if(countReb > tempCount){
      tempCount = countReb;
      name = ele.fn + " " + ele.ln;
    }
  });
  msg += ("* " + "Most rebounds:" + name + " with " + tempCount + "\n");

  // three pointer percentage
  let threePointM = 0;
  let threePointA = 0;
  let nameThree = "";
  let percentage = 0;
  let tempPerc = 0;
  let finalPerc = 0;
  let percentDivM = 0;
  let percentDivA = 0;
  obj.hls.pstsg.forEach(function(ele){
    threePointM = ele.tpm;
    threePointA = ele.tpa;
    if(threePointA > 5){
      percentage = threePointM/threePointA;
    }
    if(percentage > tempPerc){
      tempPerc = percentage;
      nameThree = ele.fn + " " + ele.ln;
    }
  });
  obj.vls.pstsg.forEach(function(ele){
    threePointM = ele.tpm;
    threePointA = ele.tpa;
    if(threePointA > 5){
      percentage = threePointM/threePointA;
    }
    if(percentage > tempPerc){
      percentDivM = threePointM;
      percentDivA = threePointA;
      tempPerc = percentage;
      finalPerc = tempPerc*100;
      finalPerc = finalPerc.toFixed(2);
      nameThree = ele.fn + " " + ele.ln;
    }
  });
  msg += ("* Player with highest 3 point percentage that took at least 5 shots: " + nameThree
  + " at %" + finalPerc + "(" + percentDivM + "/" + percentDivA + ")\n");

  //at least one block
  let countBlock = 0;
  obj.hls.pstsg.forEach(function(ele){
    if(ele.blk >= 1){
      countBlock += 1;
    }
  });
  obj.vls.pstsg.forEach(function(ele){
    if(ele.blk >= 1){
      countBlock += 1;
    }
  });
  msg += ("* There were " + countBlock + " players that had at least one block\n");
  msg +=("*  Players with more turnovers than assists:\n");

  //turnover to assist
  let turnover = 0;
  let assist =  0;
  let nameTA = "";
  msg += ("\t" + obj.hls.tc + " - " + obj.hls.tn + "\n");
  obj.hls.pstsg.forEach(function(ele){
    turnover = ele.tov;
    assist = ele.ast;
    if(turnover > assist){
      nameTA = ele.fn + " " + ele.ln;
      msg += ("\t* " + nameTA + " has an assist to turnover ratio of " + assist + ":" + turnover + "\n");
    }
  });
  msg += ("\n");
  msg += ("\t" + obj.vls.tc + " - " + obj.vls.tn + "\n");
  obj.vls.pstsg.forEach(function(ele){
    teamCity = ele.tc;
    teamName = ele.tn;
    turnover = ele.tov;
    assist = ele.ast;
    if(turnover > assist){
      nameTA = ele.fn + " " + ele.ln;
      msg += ("\t* " + nameTA + " has an assist to turnover ratio of " + assist + ":" + turnover + "\n\n");
    }
  });
  return msg;
}
module.exports = {
  processGameData: processGameData
};
