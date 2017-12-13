var current_item = 0;
var total_item = 4;
var current_item1 = 1;
var total_item1 = 2;

window.onload = function() {

    navigation("RIGHT");
    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case 37: //LEFT arrow 	
                navigation("LEFT");
                break;
         
            case 39: //RIGHT arrow 		
                navigation("RIGHT");
                break;
            
            case 13: //OK button
                go_to(current_item);
                console.log("ENTER Button");
                break;
            case 10009: //Back button
                parent.location = "index.html";
                console.log("Back Button");
                break;
            default:
                console.log("Key code : " + e.keyCode);
                break;
        }
    });

};

function navigation(direction) {

    $("#btn_" + current_item).removeClass("selected_btn");
    $("#lev_" + current_item).removeClass("selected_btn");
    if (direction == "LEFT") {
        if (current_item == 1)
            current_item = total_item;
        else
            current_item--;

    } else if (direction == "RIGHT") {
        if (current_item == total_item)
            current_item = 1;
        else
            current_item++;
    }else if (direction == "DOWN") {
        if (current_item1 == total_item1)
            current_item1 = 1;
        else
            current_item1++;
    }else if (direction == "UP") {
        if (current_item1 == 1 )
            current_item1 = total_item1;
        else
            current_item1--;
    }
    $("#btn_" + current_item).addClass("selected_btn");
    $("#lev_" + current_item).addClass("selected_btn");
    
    if (current_item1 == 2){
    	$("#btn_" + current_item).removeClass("selected_btn");
        $("#lev_" + current_item).removeClass("selected_btn");
    	$("#btn_help").addClass("selected_btn");
    } else if (current_item1 == 1){
    	
    	 $("#btn_help").removeClass("selected_btn");
    } 

};

function go_to(current_item) {
	switch (current_item) {
	case 1:
		parent.location = "Quizz/index.html";
		break;
	case 2:
		parent.location = "Hextris/index.html";
		break;
	case 3:
		parent.location = "Simoni/index.html";
		break;
	case 4:
		parent.location = "Memoryyyyyy/index.html";
		break;
	default:
		break;
	}
    sessionStorage.setItem("level", "btn_" + current_item);
    
};
