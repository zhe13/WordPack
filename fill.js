// @12.26.2015 by zhe13
//      try to fill the picture follow the image_fill_word from
"use strict"

//the color units for sampling
var colorblock =[{"r":255,"g":255,"b":255},{"r":224,"g":224,"b":224},{"r":192,"g":192,"b":192},{"r":160,"g":160,"b":160},{"r":128,"g":128,"b":128},{"r":96,"g":96,"b":96},{"r":64,"g":64,"b":64},{"r":32,"g":32,"b":32},{"r":0,"g":0,"b":0},{"r":255,"g":204,"b":229},{"r":255,"g":153,"b":204},{"r":255,"g":102,"b":178},{"r":255,"g":51,"b":153},{"r":255,"g":0,"b":127},{"r":204,"g":0,"b":102},{"r":153,"g":0,"b":76},{"r":102,"g":0,"b":51},{"r":51,"g":0,"b":25},{"r":255,"g":204,"b":204},{"r":255,"g":153,"b":255},{"r":255,"g":102,"b":255},{"r":255,"g":51,"b":255},{"r":255,"g":0,"b":255},{"r":204,"g":0,"b":204},{"r":153,"g":0,"b":153},{"r":102,"g":0,"b":102},{"r":51,"g":0,"b":51},{"r":229,"g":204,"b":255},{"r":204,"g":153,"b":255},{"r":178,"g":102,"b":255},{"r":153,"g":51,"b":255},{"r":127,"g":0,"b":255},{"r":102,"g":0,"b":204},{"r":76,"g":0,"b":153},{"r":51,"g":0,"b":102},{"r":25,"g":0,"b":51},{"r":204,"g":204,"b":255},{"r":153,"g":153,"b":255},{"r":102,"g":102,"b":255},{"r":51,"g":51,"b":255},{"r":0,"g":0,"b":255},{"r":0,"g":0,"b":204},{"r":0,"g":0,"b":153},{"r":0,"g":0,"b":102},{"r":0,"g":0,"b":51},{"r":204,"g":229,"b":255},{"r":153,"g":204,"b":255},{"r":102,"g":178,"b":255},{"r":51,"g":153,"b":255},{"r":0,"g":128,"b":255},{"r":0,"g":102,"b":204},{"r":0,"g":76,"b":153},{"r":0,"g":51,"b":102},{"r":0,"g":25,"b":51},{"r":204,"g":255,"b":255},{"r":153,"g":255,"b":255},{"r":102,"g":255,"b":255},{"r":51,"g":255,"b":255},{"r":0,"g":255,"b":255},{"r":0,"g":204,"b":204},{"r":0,"g":153,"b":153},{"r":0,"g":102,"b":102},{"r":0,"g":51,"b":51},{"r":204,"g":255,"b":229},{"r":153,"g":255,"b":204},{"r":102,"g":255,"b":178},{"r":51,"g":255,"b":153},{"r":0,"g":255,"b":128},{"r":0,"g":204,"b":102},{"r":0,"g":153,"b":76},{"r":0,"g":102,"b":51},{"r":0,"g":51,"b":25},{"r":204,"g":255,"b":204},{"r":153,"g":255,"b":153},{"r":102,"g":255,"b":102},{"r":51,"g":255,"b":51},{"r":0,"g":255,"b":0},{"r":0,"g":204,"b":0},{"r":0,"g":153,"b":0},{"r":0,"g":102,"b":0},{"r":0,"g":51,"b":0},{"r":229,"g":255,"b":204},{"r":204,"g":255,"b":153},{"r":178,"g":255,"b":102},{"r":153,"g":255,"b":51},{"r":128,"g":255,"b":0},{"r":102,"g":204,"b":0},{"r":76,"g":153,"b":0},{"r":51,"g":102,"b":0},{"r":25,"g":51,"b":0},{"r":255,"g":255,"b":204},{"r":255,"g":255,"b":153},{"r":255,"g":255,"b":102},{"r":255,"g":255,"b":51},{"r":255,"g":255,"b":0},{"r":204,"g":204,"b":0},{"r":153,"g":153,"b":0},{"r":102,"g":102,"b":0},{"r":51,"g":51,"b":0},{"r":255,"g":229,"b":204},{"r":255,"g":204,"b":153},{"r":255,"g":178,"b":102},{"r":255,"g":153,"b":51},{"r":255,"g":128,"b":0},{"r":204,"g":102,"b":0},{"r":153,"g":76,"b":0},{"r":102,"g":51,"b":0},{"r":51,"g":25,"b":0},{"r":255,"g":204,"b":204},{"r":255,"g":153,"b":153},{"r":255,"g":102,"b":102},{"r":255,"g":51,"b":51},{"r":255,"g":0,"b":0},{"r":204,"g":0,"b":0},{"r":153,"g":0,"b":0},{"r":102,"g":0,"b":0},{"r":51,"g":0,"b":0}];

var GLOBAL = {
    config:{
        unit_size:{w:2,h:2},
        fill_size:{w:3,h:3},
        fill_word:"zhe13",
        render_img:"./one.jpg"
    }
}

var process = document.getElementById("process");

// it can be changed into get black and white.by zhe13 @12.26.2015
function getNearstColor(color) {
    if(!color){return;}
    var res_color = null;
    var temp_color = null;
    var temp = 0;
    var tempv= 0;
    for(let x in colorblock){
        temp_color = colorblock;
        tempv = Math.pow((color.r-temp_color.r),2)+Math.pow((color.g-temp_color.g),2)+Math.pow((color.b-temp_color.b),2);
        if(x===0){
            temp = tempv;
            res_color = temp_color;
            continue;
        }
        if(temp>tempv){
            temp = tempv;
            res_color = temp_color;
        }
    }
    return res_color;
}
// change the color into black&white by zhe13 @12.26.2015
function getBlackWhite(color){
    if(!color){return;}
    var res_color = null;
    var temp_color = null;
    var delta = 0;
    var temp_delta = 0;
    var color_index =0;
    for(let x in colorblock){
        temp_color = colorblock[x];
        temp_delta = Math.pow((color.r-temp_color.r),2)+Math.pow((color.g-temp_color.g),2)+Math.pow((color.b-temp_color.b),2);
        if(x===0){
            color_index = x;
            delta = temp_delta;
            continue;
        }
        if(temp_delta<delta){
            delta = temp_delta;
            color_index = x;
        }
    }
    if(color_index<colorblock.length/2){
        res_color = {"r":255,"g":255,"b":255};
    }else{
        res_color = {"r":0,"g":0,"b":0};
    }
    return res_color;
}


function scanEachImageData(cvs,ctx,offset,callback,execover){
    if(!cvs || !ctx || !ctx.getImageData){
        console.log("imageData wrong");
        return;
    }
    offset = offset || {x:0,y:0};
    var img_data = ctx.getImageData(0,0,cvs.width,cvs.height);
    
    
}

function toGrey(cvs,ctx){
    
}

function setMosaic(cvs,ctx){
    var mosaic_size = GLOBAL.config.unit_size;
    var fill_size   = GLOBAL.config.fill_size;
    var temp_color = {r:0,g:0,b:0,a:0};
    
    var new_cvs = document.getElementById("latter");
    var new_ctx = new_cvs.getContext("2d");
    
    var draw_img_y =0;//which line to render
    var index_line = 0;
    
    // mix color with black to get average
    function getAverageColor(r,g,b,a){
        temp_color.r = (temp_color.r+r)/2;
        temp_color.g = (temp_color.g+g)/2;
        temp_color.b = (temp_color.b+b)/2;
        temp_color.a = (temp_color.a+a)/2;
    }
    
    // 
    function resetTempColor(){
        temp_color={r:0,g:0,b:0,a:0};
    }
    
    // it can be replaced with other picture.
    function drawText(ctx,color,info){
        // info contains infomation of place.
        var words = GLOBAL.config.fill_word;
        if(words.length<1){
            words = ".";
        }
        var index = index_line%words.length;
        var cat_char = words[index];
        ctx.fillStyle = "rgb("+color.r+","+color.g+","+color.b+")";
        ctx.font    = "700 "+info.h+"px sans-serif";
        ctx.fillText(cat_char,info.x,info.y);
        
    }
    function drawUnit(ctx,color,info){}
    
    
    
    function drawLine(matrix,y,callback){
        var line = matrix[y]
        setTimeout(function() {
            for(let x =0,len = line.length;x<len;x++){
                index_line++;
                drawText(new_ctx,line[x],{w:fill_size.w,h:fill_size.h,x:x*fill_size.w,y:y*fill_size.h});
                // line contains color info.
            }
            callback && callback();
        }, 1);
    }
    
    function fillPicture(matrix,size){
        if(draw_img_y > matrix.length-1){
            //alert("complete.");
            console.log("complete");
            return;
        }
        drawLine(matrix,draw_img_y,function(){
            fillPicture(matrix,size);
            process.innerHTML = "Now Drawing:"+parseInt(draw_img_y/matrix.length*100)+"%";
            
        });
        draw_img_y++;
    }
    
    function prepareNewCanvas(){
        let w = cvs.width;
        let h = cvs.height;
        new_ctx.width = w*fill_size.w/mosaic_size.w;
        new_ctx.height= h*fill_size.h/mosaic_size.h;
        new_ctx.clearRect(0,0,new_ctx.width,new_ctx.height);
    }
    
    
    
}

function init(image_name){
    var cvs = document.getElementById("former");
    // var img_src = image_name;
    var ctx = cvs.getContext("2d");
    var img = new Image();
    img.src = image_name;
    img.onload = function(data){
        let w = img.width;
        let h = img.height;
        cvs.width = w;
        cvs.height = h;
        ctx.drawImage(img,0,0);
        setMosaic(cvs,ctx);
    }
    
}

function main(){
    // get elements from document by ID.
    console.log("it starts");
    var select_img = document.getElementById("select_img");
    var prev_img   = document.getElementById("prev_img");
    var begin_scan = document.getElementById("begin_scan");
    
    function updateSettings(){
        var scale_rate = document.getElementById("scale");
        var fill_word  = document.getElementById("fill_word");
        var scan_unit  = document.getElementById("scan_unit");
        
        GLOBAL.config.fill_word = fill_word.nodeValue;
        
        GLOBAL.config.unit_size.w = parseInt(scan_unit.nodeValue,10);
        GLOBAL.config.unit_size.h = parseInt(scan_unit.nodeValue,10);
    
        GLOBAL.config.fill_size = {"w":parseInt(scale_rate.value*scan_unit.value,10),"h":parseInt(scale_rate.value*scan_unit.value,10)};
    }
    
    
    select_img.onchange = function(){
        prev_img.src = this.value;
        GLOBAL.config.render_img = this.value;
    };
    
    begin_scan.onclick = function(){
        updateSettings();
        init(GLOBAL.config.render_img);
    };
    
}

main();