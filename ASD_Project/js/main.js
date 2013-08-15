// Alex Hardtke, ASD 1308, Week 2

//DOM Ready - Home

$('#home').on('pageinit', function(){
	//code for home page here

	$("#jsonB").on('click', function(){
		getJson();
	});
	$("#xmlB").on("click", function(){
		getXml();
	});	
	$("#localB").on("click", function(){
		getLocal();
	});
	
	$("#cta p").css('text-align', 'center');
	
	$("h3").css('text-align', 'center');
	
});



//DOM Ready - Add Item


$('#additem').on('pageinit', function(){



// Variables
	
	
	var save = $('#submit');
	
	var autofillData = function (){
		 
	};
	
/* var getData = function(){ }; */
	
// Click events for display, save and clear
	var displayLink = $('#display');
	displayLink.on("click", getData);
	var save = $('#submit');
	save.on("click", myForm);
	var clear = $("#clear");
	clear.on("click", clearLocal);

// Clear Local
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

// Delete Local
	function deleteItem() {
		if(confirm("Are you sure you want to delete this account?")){
			localStorage.removeItem(this.key);
			alert("Account was deleted!");
			window.location.reload();
		}else{
			alert("Account was NOT deleted.");
		}
	}

// Validate
	var myForm            = $('#addForm'),
		additemerrorslink = $('#additemerrorslink');
		    
	myForm.validate({
		invalidHandler: function(form, validator) {
			additemerrorslink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for ^= "' + key +'"]');
				//console.log(label.text());
				var legend = label.closest('fieldset').find('ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>'};
			$("#additemerrors ul").html(html)},
		submitHandler: function() {
		var data = myForm.serializeArray();
		storeData(data);}
		
	});	

// Save
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
		
	var item          = {};
		item.account  = ["Account:", $('#account').val()];	
		item.email	  = ["Email:", $('#email').val()];
		item.user	  = ["Username:", $('#user').val()];
		item.password = ["Password:", $('#password').val()];
		item.notes    = ["Notes:", $('#notes').val()];
		
	//Save data into LocalStorage.
	localStorage.setItem(id, JSON.stringify(item));
	alert("Account Saved!");
		console.log(key);

	getData(key);
	};
	
// Get Data
	function getData(){
		//toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage. Default data has been added.");
			autoFillData();
		}
		console.log(localStorage);
		//Write data from Local Storage to the browser.
		var makeDiv = $('<div></div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul></ul>');
		makeDiv.append(makeList);
		$('body').append(makeDiv);
		$('items').show();
		for(var i=0,len=localStorage.length; i<len; i++){
			var makeLi = $('<li></li>');
			var linksLi = $('<li></li>');
			makeList.append(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by using JSON.parse().
			var obj = jQuery.parseJSON(value);
			var makeSubList = $('<ul></ul>');
			makeLi.append(obj);
			//getImage(obj.type[1], makeSubList);
			/*
for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.append(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.append(linksLi);
			}
*/
			makeItemLinks(localStorage.key(i), linksLi);// Create our edit and delete buttons/links for each item in Local Storage.
		}
	}
	
// Edit
	function editItem(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = jQuery.parseJSON(val());
		
		//Show the form
		//toggleControls("off");
		
		//Populates the form fields with current localStorage values.
		$('#account').val()  = item.account[1];
		$('#email').val()    = item.email[1];
		$('#user').val()     = item.user[1];
		$('#password').val() = item.password[1];
		$('#notes').val()    = item.notes[1];
		
		//Remove the initial listener for the input 'save account' button.
		save.off("click", storeData);
		//Change submit button value to edit button
		$('#submit').val() = "Edit Account";
		var editSubmit = $('#submit');
		//Save the key value established in this function as a property of the editSubmit event
		//So we can use that value when we save the data we edited.
		editSubmit.on("click", validate);
		editSubmit.key = this.key;

		
	}
	
//Get Image for the correct category that's being displayed
	function getImage(catName, makeSubList){
		var imageLi = $('<li></li>');
		makeSubList.append(imageLi);
		var newImg = $('<img></img>');
		var setSrc = newImg.attr("src", "images/"+ catName + ".png");
		imageLi.append(newImg);
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
		var editLink = $('<a></a>');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Account";
		editLink.on("click", editItem);
		editLink.innerHTML = editText;
		linksLi.append(editLink);
		
		//Add Line break
		var breakTag = $('<br></br>');
		linksLi.append(breakTag);
		
		//Add delete item link
		var deleteLink = $('<a></a>');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Account";
		deleteLink.on("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.append(deleteLink);
	}
	
});

//DOM Ready - Show


$('#show').on('pageinit', function(){
	//code for show page here
	$("topnav").css("color", "red");
	
	$.ajax({
		url: "xhr/list.php",
		type: "GET",
		dataType: 'json',
		success: function(response){
		console.log(response);
			for(var i=0, j=response.accounts.length; i<j; i++){
				var acct = response.accounts[i];
				$(''+
					'<div class="account">'+
						'<h2>'+ acct.account +'</h2>'+
						'<p>'+ acct.email +'</p>'+
						'<p>'+ acct.user +'</p>'+
						'<p>'+ acct.password +'</p>'+
						'<p>'+ acct.primary +'</p>'+
						'<p>'+ acct.type +'</p>'+
						'<p>'+ acct.notes +'</p>'+
					'</div>'
				).appendTo('#accounts');
			}
		}
	})
});
	
	





//Get Data function
		/*
var obj = [
			{
				id  : 12345,
				fname : "Alex",
				lname : "Hardtke"
			},
			{
				id  : 98765,
				fname : "John",
				lname : "Smith"	
			}
		];
		
		$('#submit').on('click', function(){
			$('display').append('<ul>');
			var info = '';
			for(i=0; i<obj.length; i++){
				info += '<li>' + obj[i].fname + "</li>";
				info += '<li>' + obj[i].lname + "</li>";
				info += '<li><a key="' + obj[i].id + '" href="#">Edit</a></li>';
				$('#display ul').html(info);
			}
			
		});
*/