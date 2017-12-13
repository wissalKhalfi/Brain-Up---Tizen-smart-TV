var current_item = 0;
var total_item = 4;

window.onload = function() {
	navigation("RIGHT");
    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case 37: //LEFT arrow 	
                /*navigation("LEFT");*/
                break;
            case TvKeyCode.KEY_UP: //UP arrow
                alert("USE LEFT AND RIGHT BUTTONS ONLY");
                break;
            case 39: //RIGHT arrow 		
                /*navigation("RIGHT");*/
                break;
            case TvKeyCode.KEY_DOWN: //DOWN arrow

                break;
            case 13: //OK button
                go_to(current_item);
                console.log("ENTER Button");
                break;
            case 10009: //Back button
                parent.location = "../MenuJeux.html";
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
    }
    $("#btn_" + current_item).addClass("selected_btn");
    $("#lev_" + current_item).addClass("selected_btn");

};

function go_to(current_item) {
    sessionStorage.setItem("level", "btn_" + current_item);
    parent.location = "Level1.html";
};