// create by zhe13 @2016.1.8
//      a function listen to click to change themes

"use strict"

var styles = {
    light:["Light","./css/light.css"],
    dark:["dark","./css/dark.css"]
};
var main_css = document.getElementById("muti-style");

function setStyle(style){
    var date = new Date();
    main_css.attributes.href.value = style[1];
    document.cookie = "main-css="+main_css.attributes.href.value+";expires="+
    date.setTime(date.getTime() + 13*24*60*60*1000);
    date.toLocaleTimeString()+";path=/";
    return style;
}

// set the opposite stylesheet
function switchColor(){
    var style = main_css.attributes.href.value;
    console.log(style);
    style ==="./css/light.css"? setStyle(styles.dark):setStyle(styles.light);
    
}

document.addEventListener("DOMContentLoaded",function(){
   
//   if (window.location.hash.slice(1)==="dark") {
//       setStyle(styles.dark);
//       return;
//   } 
//   if(window.location.hash.slice(1)==="light"){
//       setStyle(styles.light);
//       return ;
//   }
   document.cookie.split(";").forEach(function(cookie){
       cookie = cookie.split("=");
       if(cookie[0] === "main-css" && cookie[1]==="./css/dark.css"){
           setStyle(styles.dark);
       } 
   })
});

document.getElementById("switch").onclick=function(){
    console.log("click");
    switchColor();
}