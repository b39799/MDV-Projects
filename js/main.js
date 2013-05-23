// Alex Hardtke
// VFW 1305
// 5-22-13
// Project 3

window.addEventListener("DOMContentLoaded", function(){
	
	//getElementById function
	function $(x){
		var element = document.getElementById(x);
		return element;
	}
	
	//create select field element and populate with options.
	function makeCategories(){
		var formTag = document.getElementsByTagName("form");
		var	selectLi = $('select');
		var	makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "groups");
		for(var i=0, j=accountList.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optionText = accountList[i];
			makeOption.setAttribute("value", optionText);
			makeOption.innerHTML = optionText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	};

	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].primary;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			primaryValue = radios[i].value;
			}
		}
	};
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('addForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('addForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
				}
	};
	
		
	function saveData(){
		var id            = Math.floor(Math.random()*100000001);
		getSelectedRadio();
		var item          = {};
			item.account  = ["Account:", $('account').value];	
			item.email	  = ["Email:", $('email').value];
			item.user	  = ["Username:", $('user').value];
			item.password = ["Password:", $('password').value];
			item.confirm  = ["Confirm Password:", $('confirm').value];
			item.primary  = ["Primary account?", primaryValue];
			item.date     = ["Date:", $('date').value];
			item.range    = ["Account use:", $('range').value];
			item.notes    = ["Notes:", $('notes').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Account Added!");
	};

	function getData(){
		toggleControls("on");
		//Write data from Local Storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0,len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi  = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in object){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = object[n][0]+" "+object[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);// Create our edit and delete buttons/links for each item in Local Storage.
		}
	};
	
	//Make Item Links
	function makeItemLinks(key, linksLi){
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
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Account";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	//Edit Item function
	function editItem(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off");
		
		//Populate the form fields with current localStorage values.
		$('account').value = item.account[1];
		$('email').value = item.email[1];
		$('user').value = item.user[1];
		$('password').value = item.password[1];
		$('confirm').value = item.confirm[1];
		var radios = document.forms[0].primary;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Yes" && item.primary[1] == "Yes"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "No" && item.primary[1] == "No"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		
		$('date').value = item.date[1];
		$('range').value = item.range[1];
		$('notes').value = item.notes[1];
	}
	
	//Clear LocalStorage
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

	//Variable Defaults
	var accountList = ["Shopping", "Entertainment", "Business", "School", "Personal", "Other"],
		primaryValue
	;
	makeCategories();
	
	//Set Link and Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData); //GET DATA
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal); //CLEAR DATA
	var save = $('submit');
	save.addEventListener("click", saveData); //SAVE DATA

});