//Home

$(document).on("pageinit", '#home', function(){
	localStorage.clear();
	
	var add = function(acct){
		var mainAdd = $('<div data-role="collapsible">' +
						'<h2>' + acct.accountName + '</h2>' +
						'<ul>' +
						'<li>' + "Password: " + acct.password + '</li>' + 
						'<li>' + "Username: " + acct.user + '</li>' + 
						'<li>' + "Email: " + acct.email + '</li>' + 
						'<li>' + "Notes: " + acct.password + '</li>')
		return mainAdd;
	}
	
	var deleteEdit = function(item){
		var buttonLinks = $('<li>' + '<a href="#" class="delete" data-id="' +item.id+'"data-ref="'+item.rev+ '">' + 'Delete' + '</a></li>'+
							'<li>' + '<a href="form.html" class="edit" data-id="'+item.id+'"data-rev="'+item.rev+'">' + 'Edit' + '</a></li>')
		return buttonLinks;
	}
	
	
	//Load User DB
	
	$.couch.db("asdproject").view("app/accounts", {
		success: function(data) {
		//console.log(data);
		$('#accountlist').empty();
		$.each(data.rows, function(index, acc) {
			var item = (acc.value || acc.doc);
			
			$(deleteEdit(item)).appendTo($(add(item)).appendTo('#accountlist'))
		});
			$('#accountlist div').collapsible();
		}
	});
	
	
	//Delete
	$('body').on('click', '.delete', function(data){
		var doc = {};
			doc._id = $(this).data('id');
			doc._rev = $(this).data('rev');
			console.log(doc);
		if(confirm("Delete account?")){
			$.couch.db("asdproject").removeDoc(doc, {
				success: function(data){
					alert("Account deleted!");
					window.location.reload();
				}
			});
		}
	});
	
	
	//Edit
	
	$('body').on('click', '.edit', function(){
		localStorage.clear();
		var doc = {};
			doc._id = $(this).data('id');
			doc._rev = $(this).data('rev');
			localStorage.setItem('itemEdit', JSON.stringify(doc));
			console.log(localStorage);
	});
	
	// Add button
	
	$('body').on('click', '.add', function(){
		
	});
	
});





//Form

$(document).on("pageinit", '#form', function(){
	if(localStorage.length === 1){
		var value = localStorage.getItem("itemEdit")
			obj   = JSON.parse(value);
		var doc   = {};
			doc._id = obj._id;
			doc._rev = obj._rev;
		var edit = true;
		$.couch.db("asdproject").openDoc(doc._id, {
			success: function(data){
				console.log(data);
				$('#account').val(data.account);
				$('#email').val(data.email);
				$('#user').val(data.user);
				$('#password').val(data.password);
				$('#notes').val(data.notes);
			localStorage.clear();
			}
		});
	}	else {
		var edit = false;
	}
	
	
	$('#submit').on('click', function(){
		var id = Math.floor(Math.random()*1000000001);
		var data = $('#addForm').serializeArray();
		var account = {};
			account._id = "user:"+data[2].value.toLowerCase()+":"+id
			account.account = [data[0].value];
			account.email   = [data[1].value];
			account.user    = [data[2].value];
			account.password = [data[3].value];
			console.log(data);
		if(account.account === '' || account.password === ''){
			$('#error').removeClass('hidden');
			
		}else{
			$('#error').addClass('hidden');
			if(edit === true){
				$.couch.db("asdproject").removeDoc(doc,{
					success: function(data){}
				});
			};
			$.couch.db("asdproject").saveDoc(account, {
				success: function(data){
					alert("Account saved!");
					window.location = "index.html";
				},
				error: function(status){
					console.log(status);
				}
			});
		}
	});
});


