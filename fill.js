// @12.26.2015 by zhe13
//      try to fill the picture follow the image_fill_word from
// @1.7.2016 by zhe13
//      someting wrong in matrix for drawing.
//      problems:1,currentY = -1,and add itself everytime, can not scan the first line
//      problems:2,scan unit 会影响成像，使得图像纵向拉伸，～～暂未找到错误。～～会多出几行
// @1.7.2016 by zhe13
//      binarize the picture.

// @1.8.2016 by zhe13
//      remember to fix problem tomorrow:第一行没有办法扫描
// ＠1.12.2016 by zhe13 
//      fix the loop problem above
//      use data from toDataURL() to assign to a.download 
"use strict"


//the color units for sampling
var colorblock =[{"r":255,"g":255,"b":255},{"r":224,"g":224,"b":224},{"r":192,"g":192,"b":192},{"r":160,"g":160,"b":160},{"r":128,"g":128,"b":128},{"r":96,"g":96,"b":96},{"r":64,"g":64,"b":64},{"r":32,"g":32,"b":32},{"r":0,"g":0,"b":0},{"r":255,"g":204,"b":229},{"r":255,"g":153,"b":204},{"r":255,"g":102,"b":178},{"r":255,"g":51,"b":153},{"r":255,"g":0,"b":127},{"r":204,"g":0,"b":102},{"r":153,"g":0,"b":76},{"r":102,"g":0,"b":51},{"r":51,"g":0,"b":25},{"r":255,"g":204,"b":204},{"r":255,"g":153,"b":255},{"r":255,"g":102,"b":255},{"r":255,"g":51,"b":255},{"r":255,"g":0,"b":255},{"r":204,"g":0,"b":204},{"r":153,"g":0,"b":153},{"r":102,"g":0,"b":102},{"r":51,"g":0,"b":51},{"r":229,"g":204,"b":255},{"r":204,"g":153,"b":255},{"r":178,"g":102,"b":255},{"r":153,"g":51,"b":255},{"r":127,"g":0,"b":255},{"r":102,"g":0,"b":204},{"r":76,"g":0,"b":153},{"r":51,"g":0,"b":102},{"r":25,"g":0,"b":51},{"r":204,"g":204,"b":255},{"r":153,"g":153,"b":255},{"r":102,"g":102,"b":255},{"r":51,"g":51,"b":255},{"r":0,"g":0,"b":255},{"r":0,"g":0,"b":204},{"r":0,"g":0,"b":153},{"r":0,"g":0,"b":102},{"r":0,"g":0,"b":51},{"r":204,"g":229,"b":255},{"r":153,"g":204,"b":255},{"r":102,"g":178,"b":255},{"r":51,"g":153,"b":255},{"r":0,"g":128,"b":255},{"r":0,"g":102,"b":204},{"r":0,"g":76,"b":153},{"r":0,"g":51,"b":102},{"r":0,"g":25,"b":51},{"r":204,"g":255,"b":255},{"r":153,"g":255,"b":255},{"r":102,"g":255,"b":255},{"r":51,"g":255,"b":255},{"r":0,"g":255,"b":255},{"r":0,"g":204,"b":204},{"r":0,"g":153,"b":153},{"r":0,"g":102,"b":102},{"r":0,"g":51,"b":51},{"r":204,"g":255,"b":229},{"r":153,"g":255,"b":204},{"r":102,"g":255,"b":178},{"r":51,"g":255,"b":153},{"r":0,"g":255,"b":128},{"r":0,"g":204,"b":102},{"r":0,"g":153,"b":76},{"r":0,"g":102,"b":51},{"r":0,"g":51,"b":25},{"r":204,"g":255,"b":204},{"r":153,"g":255,"b":153},{"r":102,"g":255,"b":102},{"r":51,"g":255,"b":51},{"r":0,"g":255,"b":0},{"r":0,"g":204,"b":0},{"r":0,"g":153,"b":0},{"r":0,"g":102,"b":0},{"r":0,"g":51,"b":0},{"r":229,"g":255,"b":204},{"r":204,"g":255,"b":153},{"r":178,"g":255,"b":102},{"r":153,"g":255,"b":51},{"r":128,"g":255,"b":0},{"r":102,"g":204,"b":0},{"r":76,"g":153,"b":0},{"r":51,"g":102,"b":0},{"r":25,"g":51,"b":0},{"r":255,"g":255,"b":204},{"r":255,"g":255,"b":153},{"r":255,"g":255,"b":102},{"r":255,"g":255,"b":51},{"r":255,"g":255,"b":0},{"r":204,"g":204,"b":0},{"r":153,"g":153,"b":0},{"r":102,"g":102,"b":0},{"r":51,"g":51,"b":0},{"r":255,"g":229,"b":204},{"r":255,"g":204,"b":153},{"r":255,"g":178,"b":102},{"r":255,"g":153,"b":51},{"r":255,"g":128,"b":0},{"r":204,"g":102,"b":0},{"r":153,"g":76,"b":0},{"r":102,"g":51,"b":0},{"r":51,"g":25,"b":0},{"r":255,"g":204,"b":204},{"r":255,"g":153,"b":153},{"r":255,"g":102,"b":102},{"r":255,"g":51,"b":51},{"r":255,"g":0,"b":0},{"r":204,"g":0,"b":0},{"r":153,"g":0,"b":0},{"r":102,"g":0,"b":0},{"r":51,"g":0,"b":0}];

var GLOBAL = {
    config:{
        unit_size:{w:2,h:2},
        fill_size:{w:3,h:3},
        fill_word:"zhe13",
        render_img:"./one.jpg",
        binarization:false
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
        if(x==0){//pay attention to the difference between == & ===
            color_index = x;
            delta = temp_delta;
            continue;
        }
        if(temp_delta<delta){
            delta = temp_delta;
            color_index = x;
        }
    
    }
    
    if(parseInt(color_index,10)<colorblock.length/3){
        res_color = {"r":255,"g":255,"b":255};
    }else{
        res_color = {"r":0,"g":0,"b":0};
        console.log("HI,zhe13");
    }
    return res_color;
}


function scanEachImageData(cvs,ctx,offset,callback,execover){
    if(!cvs || !ctx || !ctx.getImageData){
        console.log("imageData wrong");
        return;
    }
    offset = offset || {w:1,h:1};
    console.log(offset)
    var img_data = ctx.getImageData(0,0,cvs.width,cvs.height);
    var is_end = false;
    var interval = null;
    var current_y = 0;
    var img_w = img_data.width;
    var img_h = img_data.height;
    
    // traverse line i.
    function execLine(i,line_w,image_data,execCall){
        if(is_end){
            return;
        }
        for(let j =0;j<line_w;j+=offset.w){
            var index = (i*line_w+j)*4;
            var color_info={
                 r : image_data.data[index],
                 g : image_data.data[index+1],
                 b : image_data.data[index+2],
                 a : image_data.data[index+3]
            };
            // debugger;
            callback && callback(image_data.data,{index:index,w:img_w,h:img_h},color_info);
        }
        execCall && execCall();
    }
    // @Illustration
    // <-----------w-------->
    // |p0,p1,...     ,pw-1       
    // |pw,...        ,p2w-1
    // |.               . 
    // h.               .
    // |.               .
    // |.               .
    // |.               .
    // vpw(h-1),...   ,pwh-1
    // **each p|n has 4 in the data[].so p|x,y->（wx+y)*4
    
    function nextLine(taskendCallback){
       if(interval){
           clearTimeout(interval);
           interval = null;
       } 
       // call the func when finishing the last line of picture 
       if(current_y >= img_h){
           is_end = true;
           taskendCallback && taskendCallback();
           return;
       }
       
       
    //   current_y += offset.h;
       interval = setTimeout(function(){
           execLine(current_y,img_w,img_data,function(){
               current_y += offset.h;
               nextLine(taskendCallback);
           });
       },1);
       ctx.putImageData(img_data,0,0,0,0,img_data.width,img_data.height);
       
       process.innerHTML = "now scanning:"+parseInt(current_y/img_h*100,10)+"%";
    }
    // execute the recursion
    nextLine(function(){
        ctx.putImageData(img_data,0,0,0,0,img_data.width,img_data.height);
        console.log("scan complete");
        execover && execover();
    });
    
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
                
                drawText(new_ctx,line[x],{w:fill_size.w,h:fill_size.h,x:x*fill_size.w,y:y*fill_size.h});
                // line contains color info.
                index_line++;
            }
            callback && callback();
        }, 0);
    }
    
    function fillPicture(matrix){
        if(draw_img_y > matrix.length-1){
            
            var download_data = new_cvs.toDataURL('image/png',1);
            document.getElementById("pic2").attributes.href.value = download_data;
            console.log("complete");
            return;
        }
        drawLine(matrix,draw_img_y,function(){
            fillPicture(matrix);
            process.innerHTML = "Now Drawing:"+parseInt(draw_img_y/matrix.length*100,10)+"%";
            
        });
        draw_img_y++;
        // console.log("下一行",draw_img_y);
    }
    
    function prepareNewCanvas(){
        let w = cvs.width;
        let h = cvs.height;
        let nw = w*fill_size.w/mosaic_size.w;
        let nh= h*fill_size.h/mosaic_size.h;
        new_cvs.width = nw*1.01;
        new_cvs.height= nh*1.01;
        console.log(new_ctx);
        new_ctx.clearRect(0,0,nw,nh);
    }
    
    
    var word_matrix = [];
    var pic_line = [];
    var line_mark = 0;
    scanEachImageData(cvs,ctx,mosaic_size,function(img_data,info,color){
        
        let left_top_index = info.index;
        let matrix_width   = info.w;//图片矩阵
        
        
        // in the sample rect|mosaic_size.w*h,scanEID provide the left_top point's infomation.
        // this loop mix all the colors in the sampling rect(mosaic-size) with balck\cause we use the RGDa.
        for(let r =0;r<mosaic_size.h;r++){
            for(let c =0;c<mosaic_size.w;c++){
                var sample_index = left_top_index+c*4+r*matrix_width*4;
                getAverageColor(img_data[sample_index],img_data[sample_index+1],img_data[sample_index+2],img_data[sample_index+3]);
            }
        }
        // binarize the average color
        if(GLOBAL.config.binarization){
            var bicolor = getBlackWhite(temp_color);
        }else{
            var bicolor = temp_color;
        }
        
        
        // then this loop assign the mixed temp_color 2 each unit in the mosaic.
        for(let r =0;r<mosaic_size.h;r++){
            for(let c =0;c<mosaic_size.w;c++){
                var s_idx = left_top_index+c*4+r*matrix_width*4;
                img_data[s_idx]  = bicolor.r;
                img_data[s_idx+1]= bicolor.g;
                img_data[s_idx+2]= bicolor.b;
                img_data[s_idx+3]= temp_color.a;
                
            }
        }
        
        
        //push the changing imgdata into a matrix for drawing--wrong
        // use the img data to make a matrix based on unit.
        // console.log('mark1',left_top_index,matrix_width,line_mark);
        // the top_left_index is the index in imgdata,every pixel contains 4 data.
        if(parseInt(left_top_index/(matrix_width*4),10)===line_mark){
            pic_line.push(color);
        }else{
            word_matrix.push(pic_line);
            pic_line = [];
            // line_mark ++; pay attetion to this,the matrix of text is based on unit,so
            // we can not ++ here.Add Unit_size is the right way
            line_mark = left_top_index/(matrix_width*4);
             pic_line.push(color);
        }
        // console.log(left_top_index,matrix_width,line_mark);
        resetTempColor();
    },function(){
        prepareNewCanvas();
        //console.log(word_matrix,"matrix");
        fillPicture(word_matrix);
    });
    
}

function init(image_name){
    var cvs = document.getElementById("former");

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
    var binarize   = document.getElementById("binarize");
    
    function updateSettings(){
        var scale_rate = document.getElementById("scale");
        var fill_word  = document.getElementById("fill_word");
        var scan_unit  = document.getElementById("scan_unit");
        
        GLOBAL.config.fill_word = fill_word.value;
        
        GLOBAL.config.unit_size.w = parseInt(scan_unit.value,10);
        GLOBAL.config.unit_size.h = parseInt(scan_unit.value,10);
        
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
    
    binarize.onclick = function(){
        if(binarize.value == "binarize-on"){
            binarize.value = "binarize-off";
            GLOBAL.config.binarization = false;
        }
        else{
            binarize.value = "binarize-on";
            GLOBAL.config.binarization = true;
        }
    }
    
}

main();