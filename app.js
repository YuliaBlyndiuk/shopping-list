//Initial State
var state = {
	itemList: []
};

function updList(state, item){
	state.itemList.push({name: item, check: false, remove: false});
}

// state = {
//   itemList:[{
// 		name: 'eggs', 
// 		check: false
// 	 }]
// 	}
function updCheck(state){
	//looping through the array of items that are objects
	for (var i = 0; i < state.itemList.length; i++){ 
		if (state.itemList[i].check === false) {
		//console.log('I work', state);
		// return 
		state.itemList[i].check = true;
		}
			else if (state.itemList[i].check === true) {
			return state.itemList[i].check = false;
			}
	}
}

function removeItem(state){
	for (var i = 0; i < state.itemList.length; i++){
		if (state.itemList[i].remove === false){
			console.log('I work', state);
			return state.itemList[i].remove = true;	
		}
	}
}

//Render 
function render(state){
	var listDiv = state.itemList.map(function(whatever, index){
		var style = 'style="text-decoration:none"';
		if (whatever.check === true){
			style = 'style="text-decoration:line-through"'
		} 
		else if (whatever.remove === true){
			$('.shopping-list').hide();
		}

		return '<li><span class="shopping-item" '+style + 'data-list-item-id="' + index +"'>' + whatever.name + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>'
	});
	$('.shopping-list').html(listDiv);
	//console.log('current object looks like', state);
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
		console.log($(this));
		event.stopPropagation();
		console.log('check button has been clicked', state);
		updCheck(state);
		render(state);
		
	});

	//remove section when 'del' button is pressed
	$('.shopping-list').on("click",".shopping-item-delete", function(event){
		console.log('delete button has been clicked', state);
		event.stopPropagation();
		removeItem(state)
		render(state);
	});


	// Step 1: Initial render
	render(state);
});
