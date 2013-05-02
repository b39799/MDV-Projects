// alert("JavaScript works!");

// Alex Hardtke
// SDI 1304
// Project 4
// Function Library

//Start

var myLibrary = function(){
	
	// 1. Check Phone Number: String Function
	
	var checkPhone = function(val){
		
		var numLength =  val.length;
		var areaCode =   val.substring(0,3);
		var firstDash =  val.charAt(3);
		var prefix =     val.substring(4,7);
		var secondDash = val.charAt(7);
		var lastNum =    val.substring(8,12);
		
		if (numLength === 12){
			
			if (val.charAt(3), val.charAt(7) === "-"){
				
				if (isNaN(areaCode + prefix + lastNum)){
					
					return false;
				
				} else {
					
					return true;
				}
			}
			
		} else {
		
			return false;
		
		}
	
	};
	
	// 2. Check Email: String Function
	 
	 var checkEmail = function(email){
		
		var atPosition = email.indexOf("@");
		var dotPosition = email.lastIndexOf(".");
		
		if (Number(atPosition) > 1){
			
			if (Number(dotPosition > Number(atPosition + 2))){
				
				if (Number(dotPosition + 2) <= email.length){
					
					return true;
				
				} else {
				
					return false;
				
				}
			
			} else { return false; }
		
		} else { return false; }
	};
	
	// 3. Check URL: String Function
	
	var checkUrl = function(url){
		
		if (url.substring(0,7) === "http://"){
			
			return true;
			
		} else if(url.substring(0,8) === "https://"){
			
			return true;
			
		} else {
			
			return false;
			
		}
		
	};
	
	// 4. Title-case: String Function
	
	// 5. Number-Place Format: Number Function
	
	// 6. Return Number from String: Number Function
	return {
		"checkPhone": checkPhone,
		"checkEmail": checkEmail,
		"checkUrl": checkUrl
	}
};

var newLib = new myLibrary();

console.log("This is a valid phone number: " + newLib.checkPhone("123-456-7890")); // Phone Number Call

console.log("This is a valid email address: " + newLib.checkEmail("alex@example.com")); // Email Call

console.log("This is a valid URL: " + newLib.checkUrl("http://www.site.com")); // URL Call