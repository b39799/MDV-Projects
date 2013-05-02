// alert("JavaScript works!");

// Alex Hardtke
// SDI 1304
// Project 4
// Function Library

var myLibrary = function(){
	
	// Check Phone Number: String Function
	
	var checkPhone = function(val){
		
		var numLength = val.length;
		var areaCode = val.substring(0,3);
		var firstDash = val.charAt(3);
		var prefix = val.substring(4,7);
		var secondDash = val.charAt(7);
		var lastNum = val.substring(8,12);
		
		if (numLength === 12){
			
			if (firstDash, secondDash === "-"){
				
				if (isNaN(areaCode, prefix, lastNum)){
					
					return false;
				
				} else {
					
					return true;
				}
			}
		} else {
			return false;
		}
	
	}
	
	// Check Email: String Function
	
	
	
	
	// Check URL: String Function
	
	// Title-case: String Function
	
	// Number-Place Format: Number Function
	
	// Return Number from String: Number Function
	return {
		"checkPhone": checkPhone
	}
};

var newLib = new myLibrary();

console.log("This is a valid phone number: " + newLib.checkPhone("123-456-7890"));