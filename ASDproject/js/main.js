// Alex Hardtke, ASD 1308, Week 2

//DOM Ready - Home

$('#home').on('pageinit', function(){
	
	
//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON object data required for this to work comes from our json.js file which is loaded from our html page.
		//Store the JSON object into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}	
	
// GET DATA
	function getData(){

		if(localStorage.length === 0){
			alert("There is no data in Local Storage. Default data has been added.");
			autoFillData();
		}
		//Create new list
			$hpage.find(".homeAccts").html('<ul></ul>');
			var $list = $hpage.find(".homeAccts ul");
				
			for (var i=0, j=localStorage.length; i<j; i++){
				var acct = localStorage.length[i];
				var strHtml = '<li><a href="#detail">';
				strHtml += acct.account;
				strHtml += '</a></li>\n';
				
				var a = $(strHtml);
				$list.append(a);
				
				$list.find("a:last").data("aName", JSON.stringify(acct));	
			}
			
			$list.listview();
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
	
	
	
	
	
	var $hpage = $('#home');
	
	// Get JSON accouts and append to list
	
	$.ajax({
		url: 'xhr/accj.php',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			//console.log(response.account[2].accountName);
			$hpage.find(".homeAccts").empty();
			
			//Create new list
			$hpage.find(".homeAccts").html('<ul></ul>');
			var $list = $hpage.find(".homeAccts ul");
				
			for (var i=0, j=response.account.length; i<j; i++){
				var acct = response.account[i];
				var strHtml = '<li><a href="#detail">';
				strHtml += acct.accountName;
				strHtml += '</a></li>\n';
				
				var a = $(strHtml);
				$list.append(a);
				
				$list.find("a:last").data("aName", JSON.stringify(acct));	
			}
			
			$list.listview();
			
			$list.find("a").click(function(){
				var $this = $(this);
				$("#detail").data("aName", $this.data("aName"));
			})
		}
	});
	
	
	//Get XML
	
	$.ajax({
		url: 'data.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(response){
			
			var $list = $hpage.find(".homeAccts ul");
			$(response).find("account").each(function(){
				
				var $acct = $(this);
				var strHtml = '<li><a href="#detailX">' + $acct.find("accountName").text();
				strHtml += '</a></li>\n';
				
				var a = $(strHtml);
				$list.append(a);
				
				$list.find("a:last").data("aName");
			});
			
			$list.listview('refresh');
			
			$list.find("a").click(function(){
				var $this = $(this);
				$("#detailX").data("aName", $this.data("aName"));
			})
			
						
		}
		
	});
	
	
	
	//ClearLocalStorage function
	$('#clear').on("click", function (){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All accounts are deleted!");
			window.location.reload();
			return false;
		}
	});
		
});



//DOM Ready - Detail Page (JSON)
$('#detail').on('pageinit', function(){
	$page = $("#detail");
	$page.on("pageshow", function(event, ui){
		var objAcc = JSON.parse($page.data("aName"));
		var strHtml = '<h1><span id="resultsAccount">'+ objAcc.accountName+'</span></h1>'+
					'<p><b>Password:</b> <span id="resultsPassword">'+ objAcc.password+'</span></p>'+
					'<p><b>User Name:</b> <span id="resultsUser">'+ objAcc.user+'</span></p>'+
					'<p><b>Email:</b> <span id="resultsEmail">'+ objAcc.email+'</span></p>'+
					'<p><b>Notes:</b> <span id="resultsNotes">'+ objAcc.notes+'</span></p>';
		$page.find(".container-account").html(strHtml);
	});
	
	
	
});



//DOM Ready - Detail XML Page
$('#detailX').on('pageinit', function(){
	$pageX = $("#detailX");
	$pageX.on("pageshow", function(event, ui){
		
		var objAcc = JSON.parse($pageX.data("aName"));
		var strHtml = '<h1><span id="resultsAccount">'+ objAcc.accountName+'</span></h1>'+
					'<p><b>Password:</b> <span id="resultsPassword">'+ objAcc.password+'</span></p>'+
					'<p><b>User Name:</b> <span id="resultsUser">'+ objAcc.user+'</span></p>'+
					'<p><b>Email:</b> <span id="resultsEmail">'+ objAcc.email+'</span></p>'+
					'<p><b>Notes:</b> <span id="resultsNotes">'+ objAcc.notes+'</span></p>';
		$pageX.find(".container-account").html(strHtml);
	});
	
	
	
});


//DOM Ready - Add Item


$('#additem').on('pageinit', function(){

	$("#submit").on("click", function(){
	
		var $addForm = $("#addForm");
		var account = $("#account").val();
		var password = $("#password").val();
		var user = $("#user").val();
		var email = $("#email").val();
		var notes = $("#notes").val();
		
		//If empty
		if(account === ''){
			$('#alert').html("<strong>Warning!</strong> You must enter the name of the account or website.");
			$('#alert').fadeIn().delay(2000).fadeOut();
			return false;
		}
		if(password === ''){
			$('#alert').html("<strong>Warning!</strong> You must enter your password.");
			$('#alert').fadeIn().delay(2000).fadeOut();
			return false;
		}
//editItem function
		function editItem(){
			//Grab the data from our item from Local Storage.
			var value = localStorage.getItem(this.key);
			var item = JSON.parse(value);
			
			//Show the form
			//toggleControls("off");
			
			//Populates the form fields with current localStorage values.
			$('#account').value  = item.account[1];
			$('#email').value    = item.email[1];
			$('#user').value     = item.user[1];
			$('#password').value = item.password[1];
			$('#notes').value    = item.notes[1];
			
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
		
// Validate function
		var myForm = $('#addForm'),
		additemerrorslink = $('#additemerrorslink');
			    
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
		
		
//STORE DATA		
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
				item.account  = [$('#account').val()];	
				item.email	  = [$('#email').val()];
				item.user	  = [$('#user').val()];
				item.password = [$('#password').val()];
				item.notes    = [$('#notes').val()];
			//Save data into LocalStorage.
			localStorage.setItem(id, JSON.stringify(item));
			console.log(localStorage);
			alert("Account Saved!");
		}
		
		
		
		
		//Add list items
		$("#detail").prepend('<h1><span id="resultsAccount">'+ item.account+'</span></h1>'+
					'<p><b>Password:</b> <span id="resultsPassword">'+ item.password+'</span></p>'+
					'<p><b>User Name:</b> <span id="resultsUser">'+ item.user+'</span></p>'+
					'<p><b>Email:</b> <span id="resultsEmail">'+ item.email+'</span></p>'+
					'<p><b>Notes:</b> <span id="resultsNotes">'+ item.notes+'</span></p>'
		);
			
	});
	
	$("#reset").on("click", function(){
		window.localStorage.clear();
		location.reload();
		return false;
	});
	


// Save Data to Local Storage
var acct = "";
var pass = "";
var user = "";
var email = "";
var notes = "";

function saveData(){
	localStorage.setItem("acct", $("#account".val()));
	localStorage.setItem("pass", $("#password".val()));
	localStorage.setItem("user", $("#user".val()));
	localStorage.setItem("email", $("#email".val()));
	localStorage.setItem("notes", $("#notes".val()));
};

// Edit Data
function editData(){
	$("")
}



//edit account



//delete account





});