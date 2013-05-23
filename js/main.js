// Alex Hardtke
// VFW 1305
// 5-22-13
// Project 3

window.addEventListener("DOMContentLoaded", function() {

	//getElementById function
	function $(x){
		var element = document.getElementById(x);
		return element;
	}
	
	//enableConfirm field function
	function enableConfirm(){
		if($('password').value !== ""){
			$('confirm').removeAttribute("disabled");
		}
	}
	
	//Create select field element and populate with options.
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
	
	//toggleControls function
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
	}
	
	//saveData function
	function saveData(key){
		//If there is no key, this means this is a brand new item and we need a new key.
		if(!key){
			var id        = Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so it will save over the data
			//The key is the same key that's been passed along from the editSubmit event handler.
			//To the validate function and then passed here into the saveData function.
			id = key;
		}
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
		//Save data into LocalStorage.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Account Saved!");
	}
	
	//getData function
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
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by using JSON.parse().
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);// Create our edit and delete buttons/links for each item in Local Storage.
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
		toggleControls("off");
		
		//Populates the form fields with current localStorage values.
		$('account').value = item.account[1];
		$('email').value = item.email[1];
		$('user').value = item.user[1];
		$('password').value = item.password[1];
		$('confirm').value = item.confirm[1];
		var radios = document.forms[0].primary;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Yes" && item.primary[1] == "Yes"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "No" && item.primary[1] == "No"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('date').value = item.date[1];
		$('range').value = item.range[1];
		$('notes').value = item.notes[1];
		
		//Remove the initial listener for the input 'save account' button.
		save.removeEventListener("click", saveData);
		//Change submit button value to edit button
		$('submit').value = "Edit Account";
		var editSubmit = $('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//So we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
	}
	
	function deleteItem() {
		
		if(confirm("Are you sure?")){
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
	
	//Validate function
	function validate(e){
		//Define the elements we want to check
		var getAccount = $('account');
		var getEmail = $('email');
		var getPassword = $('password');
		var getConfirm = $('confirm');
		
		//Reset error messages
		errMsg.innerHTML = "";
			getAccount.style.border = "1px solid black";
			getEmail.style.border = "1px solid black";
			getPassword.style.border = "1px solid black";
			getConfirm.style.border = "1px solid black";

		
		//Get error messages
		var messageAry = [];
		
		//Account validation
		if(getAccount.value === ""){
			var accountError = "Please enter the Account name.";
			getAccount.style.border = "1px solid red";
			messageAry.push(accountError);
		}
		
		//Email validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
		
		
		//Password validation
		if(getPassword.value === ""){
			var passwordError = "Please enter the password for this account.";
			getPassword.style.border = "1px solid red";
			messageAry.push(passwordError);
		}
		
		//Confirm password validation
		if(getConfirm.value !== getPassword.value){
			var confirmError = "Please re-enter your password.";
			getConfirm.style.border = "1px solid red";
			messageAry.push(confirmError);
		}
		
		//If there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//If all is OK, save the data! Send the key value (which came from the getData funciton).
			//Remember this key value was passed through the editSubmit event listener as a property.
			saveData(this.key);
		}
		
	}

	//Variable Defaults
	var accountList = ["Shopping", "Entertainment", "Business", "School", "Personal", "Other"],
		primaryValue,
		errMsg = $('errors')
	;
	makeCategories();
	
	//Set Link and Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData); //GET DATA
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal); //CLEAR DATA
	var save = $('submit');
	save.addEventListener("click", validate); //SAVE DATA
	var confirmEm = $('password');
	confirmEm.addEventListener("blur", enableConfirm);

});