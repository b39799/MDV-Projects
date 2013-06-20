//Alex Hardtke
//MiU 1306
//6-20-13
//Project 

//$('#home').on('pageinit', function(){
	//code needed for home page goes here
//});	

var storeData = function(data){
	console.log(data);
};

var autofillData = function (){
	 
};

var getData = function(){

};


var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};
		
$('#additem').on('pageinit', function(){

		var myForm = $('#addForm'),
			additemerroslink = $('#additemerroslink')
		;
		    
		    myForm.validate({
			invalidHandler: function(form, validator) {
				additemerrorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for ^= "' + key +'"]');
					console.log(label.text());
					var legend = label.closest('fieldset').find('ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
				};
				$("#additemerrors ul").html(html);
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
	//getElementById function
	function ge(x){
		var element = document.getElementById(x);
		return element;
	}
	
	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].primary;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			primaryValue = radios[i].value;
			}
		}
	}
	
	//Find value of selected Drop Down menu field
	function getSelectedDrop(){
		var drop = document.forms[0].type;
		for(var i=0; i<drop.length; i++){
			if(drop[i].selected){
				typeValue = drop[i].value;
			}
		}
	}
	
	//storeData function
	function storeData(key){
		//If there is no key, this means this is a brand new item and we need a new key.
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so it will save over the data
			//The key is the same key that's been passed along from the editSubmit event handler.
			//To the validate function and then passed here into the storeData function.
			id = key;
		}
		getSelectedRadio();
		getSelectedDrop();
		var item          = {};
			item.account  = ["Account:", ge('account').value];	
			item.email	  = ["Email:", ge('email').value];
			item.user	  = ["Username:", ge('user').value];
			item.password = ["Password:", ge('password').value];
			//item.confirm  = ["Confirm Password:", ge('confirm').value];
			item.primary  = ["Primary account?", primaryValue];
			item.date     = ["Date:", ge('date').value];
			item.range    = ["Account use:", ge('range').value];
			item.type     = ["Account Type:", typeValue];
			item.notes    = ["Notes:", ge('notes').value];
		//Save data into LocalStorage.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Account Saved!");
	}
	
	//getData function
	function getData(){
		//toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage. Default data has been added.");
			autoFillData();
		}
		
		//Write data from Local Storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "block";
		for(var i=0,len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by using JSON.parse().
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			getImage(obj.type[1], makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			//makeItemLinks(localStorage.key(i), linksLi);// Create our edit and delete buttons/links for each item in Local Storage.
		}
	}
	
	//Get the image for the correct category that's being displayed
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}
	
	
	
	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON object data required for this to work comes from our json.js file which is loaded from our html page.
		//Store the JSON object into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//makeItemLinks function
	function makeItemLinks(key, linksLi){
		//Add edit item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Account";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//Add Line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//Add delete item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Account";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	//editItem function
	function editItem(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		//toggleControls("off");
		
		//Populates the form fields with current localStorage values.
		ge('account').value  = item.account[1];
		ge('email').value    = item.email[1];
		ge('user').value     = item.user[1];
		ge('password').value = item.password[1];
		//ge('confirm').value  = item.confirm[1];
		var radios = document.forms[0].primary;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Yes" && item.primary[1] == "Yes"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "No" && item.primary[1] == "No"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		ge('date').value     = item.date[1];
		ge('range').value    = item.range[1];
		ge('notes').value    = item.notes[1];
		
		//Remove the initial listener for the input 'save account' button.
		save.removeEventListener("click", storeData);
		//Change submit button value to edit button
		ge('submit').value = "Edit Account";
		var editSubmit = ge('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//So we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;

		
	}
	
	function deleteItem() {
		
		if(confirm("Are you sure you want to delete this account?")){
			localStorage.removeItem(this.key);
			alert("Account was deleted!");
			window.location.reload();
		}else{
			alert("Account was NOT deleted.");
		}
	}
	
	//ClearLocalStorage function
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All accounts are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	var displayLink = ge('displayLink');
	displayLink.addEventListener("click", getData); //GET DATA
	var clearLink = ge('clear');
	//clearLink.addEventListener("click", clearLocal); //CLEAR DATA
	//if(ge('save')){
		var save = ge('submit');
		//save.addEventListener("click", validate); //SAVE DATA
	//}
	
	//Search
	var searchButton = ge('searchBtn');
	
	var getSearch = function(){
		var category = ge('groups').value;
		var term = ge('search').value;
		
		//Search by category only
		if(category != "--Choose A Category--" && term === ""){
			var makeList = document.createElement("ul");
			document.getElementById("results").appendChild(makeList);
			//go find the category items
			for(var i=0,len=localStorage.length; i<len; i++){
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				if(category === obj.type[1]){
					var listItem = document.createElement("li");
					var subList = document.createElement("ul");
					listItem.appendChild(subList);
					makeList.appendChild(listItem);
					for(n in obj){
						var finalLi = document.createElement("li");
						subList.appendChild(finalLi);
						finalLi.innerHTML = obj[n][0]+ " " + obj[n][1];
					}
				}
			}
		}
		
		//Search by term only
		if(category === "--Choose A Category--" && term != ""){
			var makeList = document.createElement("ul");
			document.getElementById("results").appendChild(makeList);
			for(var i=0,len=localStorage.length; i<len; i++){
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				for(n in obj){
					var listItem = document.createElement("li");
					var subList = document.createElement("ul");
					listItem.appendChild(subList);
					makeList.appendChild(listItem);
					if(term === obj[n][1]){
						for(m in obj){
							var finalLi = document.createElement("li");
							subList.appendChild(finalLi);
							finalLi.innerHTML = obj[m][0]+ " " + obj[m][1];
						}
					}
				}
			}
		}
		
		//Search by both term and category
		if(category != "--Choose A Category--" && term != ""){
			var makeList = document.createElement("ul");
			document.getElementById("results").appendChild(makeList);
			for(var i=0,len=localStorage.length; i<len; i++){
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				for(n in obj){
					var listItem = document.createElement("li");
					var subList = document.createElement("ul");
					listItem.appendChild(subList);
					makeList.appendChild(listItem);
					if(term === obj[n][1] && category === obj.type[1]){
						for(m in obj){
							var finalLi = document.createElement("li");
							subList.appendChild(finalLi);
							finalLi.innerHTML = obj[m][0]+ " " + obj[m][1];
						}
					}
				}
			}
		}
	

	};

	if(ge('searchBtn')){
	searchButton.addEventListener("click", getSearch);
	}
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.




