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
function updCheck(state, index){
	console.log('state is', state);
	if (state.itemList[index].check === false){
		state.itemList[index].check = true;
	}
	else if (state.itemList[index].check === true){
		state.itemList[index].check = false;
	}
}

function removeItem(state, index){
	if (state.itemList[index].remove === false){
		state.itemList[index].remove = true;
	}
	else if (state.itemList[index].remove === true){
		state.itemList[index].remove = false;
	}
}

//Render 
function render(state){
	var listDiv = state.itemList.map(function(item, index){
		var style = 'style="text-decoration:none"';
		if (state.itemList[index].check === true){
			style = 'style="text-decoration:line-through"'
		} 

		console.log(state.itemList[index].remove);
		if (state.itemList[index].remove === true){
			console.log('removed', index);
			return;
		}

		// <li data-list-item-id="1"
		return '<li data-list-item-id="' + index + '"><span class="shopping-item"' + style + '>' + item.name + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>'
	});
	$('.shopping-list').html(listDiv);
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
		var index = $(this).closest("li").attr('data-list-item-id');
		console.log('index is', index);
		updCheck(state, index);
		render(state);
		
	});

	//remove section when 'del' button is pressed
	$('.shopping-list').on("click",".shopping-item-delete", function(event){
		console.log('delete button has been clicked', state);
		event.stopPropagation();
		var index = $(this).closest("li").attr('data-list-item-id');
		removeItem(state, index);
		render(state);
	});


	// Step 1: Initial render
	render(state);
});
