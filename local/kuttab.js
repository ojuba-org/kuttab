/*
    Copyright © 2009, Muayyad Alsadi <alsadi@ojuba.org>

    Released under terms of Waqf Public License.
    This program is free software; you can redistribute it and/or modify
    it under the terms of the latest version Waqf Public License as
    published by Ojuba.org.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

    The Latest version of the license can be found on
    "http://waqf.ojuba.org/"
*/
var klass="class";
var words = p.split(' ');
var wordIndex=0;
var charsDone=0;
var cw;
var startTime;
var seconds = 0;
var started = 0; /* 0:not_started, 1:started, -1: over */
var secondTicker;
var speedMin=20;
var timeMax=0;
if (!Boolean(String.prototype.trim)) {
  String.prototype.trim = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  };
}

function race_init()
{
wordIndex=0;
charsDone=0;
seconds = 0;
started = 0; /* 0:not_started, 1:started, -1: over */
document.getElementById('typed_div').style.display='block';
document.getElementById('unfinished_result').style.display='none';
document.getElementById('result_div').style.display='none';

}

function render()
{
  race_init()
  document.getElementById('txt').innerHTML="<span id='word0' class='current'>"+words[0]+"</span>";
  for (i=1;i<words.length;i++)
  {
  document.getElementById('txt').innerHTML+=" <span id='word"+i+"'>"+words[i]+"</span>";
  }
  /* hack for ie */
  if (document.getElementById('word0').getAttribute(klass)!='current') {
    klass="className";
  }

}

function endRace()
{
  document.getElementById('typed_div').style.display='none';
  document.getElementById('unfinished_result').style.display='none';
  document.getElementById('result_div').style.display='block';
  document.getElementById('txt').innerHTML=document.getElementById('result_div').innerHTML;
  document.getElementById('wpm').innerHTML=Math.floor(charsDone*60.0/5.0/seconds+0.5);
  document.getElementById('result_wpm').innerHTML=Math.floor(charsDone*60.0/5.0/seconds+0.5);
  started=-1
  seconds=0
}

function raceOver()
{
  if (started==1) {
    endRace();

document.getElementById('time').innerHTML="انتهى";
document.getElementById("time").style.color="red";
document.getElementById("time").style.fontSize="28px";
 document.getElementById("time").style.textShadow="1px 1px 1px #0000ff";
    document.getElementById('unfinished_result').style.display='inline';
  }
  return false
}
function updateTimer()
{
document.getElementById("time2").style.marginTop = "5px";
  if (started == 1) {
    seconds++;
 document.getElementById("time2").style.width = "70px";
 document.getElementById("time2").style.height = "70px";
    document.getElementById('time').innerHTML=timeMax-seconds;
document.getElementById("time").style.color="blue";
 document.getElementById("time2").style.backgroundImage = "url('local/img/timer.gif')";
    if (seconds!=0) {
        document.getElementById('wpm').innerHTML=Math.floor(charsDone*60.0/5.0/seconds+0.5);
 document.getElementById("wpm2").style.width = "190px";
 document.getElementById("wpm2").style.height = "40px";
 document.getElementById("wpm2").style.textShadow="1px 1px 1px red";
 document.getElementById("wpm2").style.backgroundImage = "url('local/img/fin.png')";
    }
  }
  return true
}

function keydown(e)
{
  if (started == 0)
  {
    started = 1;
    var d=new Date();
    startTime = d.getTime();
    charsDone=0;
    timeMax = Math.ceil(60.0*(p.length/5)/speedMin);
    window.setTimeout("raceOver()", timeMax*1000);
    secondTicker=setInterval('updateTimer()',1000);
  }
}

function error(i)
{
document.getElementById('word'+i).setAttribute(klass, "error");
document.getElementById('typedTxt').setAttribute(klass, "typedTextError");
}
function current(i)
{
document.getElementById('word'+i).setAttribute(klass, "current");
document.getElementById('typedTxt').setAttribute(klass, "typedText");
}

function oneWordDone()
{
  charsDone+=words[wordIndex].length+1;
  if (seconds!=0) {
    document.getElementById('wpm').innerHTML=Math.floor(charsDone*60.0/5.0/seconds+0.5);
  }
  document.getElementById('word'+wordIndex).setAttribute(klass, "typedOk");
  wordIndex++;
  if (wordIndex==words.length) {
    endRace();
  } else {
    current(wordIndex);
  }
}

function keyup(e)
{
  if (started!=1) {
    return;
  }
  var k = (window.event) ? event.keyCode : e.keyCode;
  cw=document.myForm.typedTxt.value;
  cw=cw.trim();
  // unprocessed words
  if (cw.indexOf(' ')>=0) {
    w=cw.split(' ');
    l=w.length
    for (i=0;i<l;++i) {
      cw=w[i].trim();
      if (words[wordIndex]==cw) {
        oneWordDone();
      } else {
        break;
      }
    }
    cw=w.slice(i,l).join(' ')
    cw=cw.trim();
    document.myForm.typedTxt.value=cw
  }
  // a white space recieved
  if (k==32 || k==13 || k==10) {
    if (words[wordIndex]==cw) {
      oneWordDone();
      document.myForm.typedTxt.value="";
    } else {
      error(wordIndex);
    }
    return;
  }
  // usual letter in the middle of a word
  if (cw.length>words[wordIndex].length) {
    error(wordIndex);
  } else {
    if (words[wordIndex].substr(0,cw.length)!=cw) {
      error(wordIndex);
    } else {
      current(wordIndex);
    }
  }


}

function main()
{
  render();
  document.getElementById('typedTxt').focus();
  if (window.captureEvents) {
    window.captureEvents(Event.KEYPRESS);
    window.onkeyup=keyup;
    window.onkeydown=keydown;
  } else {
    document.onkeyup=keyup;
    document.onkeydown=keydown;
  }
  
}

