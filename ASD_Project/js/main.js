// Alex Hardtke, ASD 1308, Week 2

//DOM Ready
$(function(){

	$('#home').on('pageinit', function(){
		//code for home page here
		
		//Get Data function
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
		
		
		
		
	});
	
	$('#additem').on('pageinit', function(){
		//code for add item page here
	});

}); // End DOM Ready