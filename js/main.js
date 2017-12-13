var current_item=0;
var total_item=2;


window.onload = function () {
	navigations("down");
   document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case TvKeyCode.KEY_LEFT: //LEFT arrow 	  	
    		break;
    	case TvKeyCode.KEY_UP: //UP arrow
    		/*TO DO 2 : NAVIGATION */
    		navigations("up");
    		
    		break;
    	case TvKeyCode.KEY_RIGHT : //RIGHT arrow 		
    		break;
    	case TvKeyCode.KEY_DOWN: //DOWN arrow
    		/*TO DO 3 : NAVIGATION */ 	
    		navigations("down");
    	
    		break;
    	case TvKeyCode.KEY_ENTER: //OK button
    		/*TO DO : Redirection */
    		redirections(current_item);
    	default:
    		console.log("Key code : " + e.keyCode);
    		break;
    		
    	}
    });
        
};

/* TO DO 1 : Fonction de navigation */
function navigations(direction)
{
	$("#btn_"+current_item).removeClass("selected_btn");//style de boutton 
	if(direction=="up"){
		if(current_item==1){
			current_item=total_item;
		}else{
			current_item--;
		}
	}
	if(direction=="down"){
		if(current_item==total_item){
			current_item=1;
		}else{
			current_item++;
		}
		
	}
	$("#btn_"+current_item).addClass("selected_btn");
}
function redirections (current_item)
{
	console.log("curr: "+ current_item);
	//sessionStorage.setItem("key", current_item)
	if(current_item==1)
		{
			parent.location="MenuJeux.html";
		}
	if(current_item==2)
		{
		parent.location="about.html";
		}
}