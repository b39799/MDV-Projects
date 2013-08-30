$(document).ready(function(){
	$.ajax({
		"url": "_view/accounts",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, acc){
				var account = acc.value.accountName;
				var password = acc.value.password;
				var username = acc.value.user;
				var email = acc.value.email;
				var notes = acc.value.notes;
				$('#accountlist').append(
					$('<li>').append(
						$('<a>').attr("href", "#").text(account))
					);
			
			});
			$('#accountlist').listview('refresh');
		}
	});
});