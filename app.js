//Initial State
var state = {
	itemList: []
};

function updList(state, item){
	state.itemList.push({name: item, check: false});
}

// state = {
//   itemList:[{
// 		name: 'eggs', 
// 		check: false
// 	 }]
// 	}
// After:
function updCheck(state){
	//looping through the array of items that are objects
	for (var i = 0; i < state.itemList.length; i++){ 
		if (state.itemList[i].check === false) {
		console.log('I work', state);
		return state.itemList[i].check = true;
		}
			else if (state.itemList[i].check === true) {
			return state.itemList[i].check = false;
			}
		
	}

}

//Render 
function render(state){
	var listDiv = state.itemList.map(function(whatever){
		var style = 'style="text-decoration:none"';
		if (whatever.check === true){
			style = 'style="text-decoration:line-through"'
		} 
		return '<li><span class="shopping-item" '+style +'>' + whatever.name + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>'
	});
	$('.shopping-list').html(listDiv);
	console.log('current object looks like', state);
}


//-------------------------------------------------------------------

//Step 2: Listener: when user enters & submits the item...
$(function(){

	$('#js-shopping-list-form').submit(function(event){	
		event.preventDefault();
		//get the value
		var enteredItem = $('#shopping-list-entry').val();
		//Step 3: Call helper function to change the state:
		updList(state, enteredItem);
		//Step 4: re-render:
		render(state);

	});
	
	//check an item after the button is pressed
	$('.shopping-list').on("click",".shopping-item-toggle", function(event){
		event.stopPropagation();
		updCheck(state);
		render(state);
		
	});

	//remove section when 'del' button is pressed
	// $('.shopping-list').on("click",".shopping-item-delete", function(){
	// 	//console.log('I have been clicked');
	// 	removeItem(state);
	// });


	// Step 1: Initial render
	render(state);
});
