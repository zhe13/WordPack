function addSelection(str){
    var select = document.getElementById("select_img");
    var option = document.createElement("OPTION");
    
    option.value = "new"+str;
    option.text = "add new";
    select.options.add(option);
}

addSelection("wtz");