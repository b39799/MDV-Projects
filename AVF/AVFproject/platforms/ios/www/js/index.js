/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
initialize: function() {
	this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
	document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
onDeviceReady: function() {
	app.receivedEvent('deviceready');
	
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
	var parentElement = document.getElementById(id);
	var listeningElement = parentElement.querySelector('.listening');
	var receivedElement = parentElement.querySelector('.received');
	
	listeningElement.setAttribute('style', 'display:none;');
	receivedElement.setAttribute('style', 'display:block;');
	
	console.log('Received Event: ' + id);
}
    
    
    
    
    
    
    // var contacts = function(){};
    //Access contacts database.
    
    // var map = function(){};
    //Gets map data and displays on page.
    
    // var cam = function(){};
    //Accesses camera app.
    
    // var InAppBrowser = function(){};
    //Calls web browser window in app.
    
    // var storage = function(){};
    //Access to storage options.
};


$('#home').on('pageinit', function(){
			  
              
              //Instagram
              $(function(){
                var tag= "cars";
                var url= "https://api.instagram.com/v1/media/popular?client_id=56fd6edc02a84b3c8d4af1e3d7f3bbf8";
                $.getJSON(url, screenOutput);
				
                });
			  
              var screenOutput = function(info){
			  // alert("screenOutput");
			  console.log(info);
			  
              $("#instagram-msg").html("<h2>Instagram Results:</h2>")
			  
              $.each(info.data, function(index, photo){
                     var pic = "<li><img src='" + photo.images.standard_resolution.url + "' alt+'" + photo.user.id +
                     "' /><h4>" + photo.user.full_name + ", <em>(" +photo.user.username +")</em></h4></li>";
                     $("#instagram").append(pic);
					 });
              };
			  
			  
			  });

$('#home').on('pageinit', function(){
			  
              //ESPN
              $(function(){
                var url= "http://api.espn.com/v1/now/top?apikey=ds5dk4pnu2n3jaufgys7yynm";
                $.getJSON(url, screenOutput);
                });
              
              var screenOutput = function(info){
              //alert("screenOutput");
              console.log(info);
              
              
              $.each(info.feed, function(index, item){
                     var head = "<ul><li><img src='" + item.images[0].url + "' alt+'" + item.linkText + "' /><h3>" + item.headline + "</h3></li></ul>";
                     $("#espn").append(head);
                     
                     });
              }
              
			  });




// N A T I V E


var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var watchID = null;

document.addEventListener("deviceready",onDeviceReady,false);


function onDeviceReady() {
	
	//CAMERA
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	
	
	// DEVICE
	var element = document.getElementById('deviceProperties');
	element.innerHTML =
	'Device Platform: ' + device.platform + '<br />' +
	'Device Model: '    + device.model    + '<br />' +
	'Device Version: '  + device.version  + '<br />';
	
	
	//COMPASS
	startWatch();
}




// C A M E R A

function onPhotoDataSuccess(imageData) {
	
	var smallImage = document.getElementById('smallImage');
		
	smallImage.style.display = 'block';
		
	smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
	
	var largeImage = document.getElementById('largeImage');
		
	largeImage.style.display = 'block';
	
	largeImage.src = imageURI;
}

function capturePhoto() {

	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
								destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {

	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
								destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {

	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
								destinationType: destinationType.FILE_URI,
								sourceType: source });
}

function onFail(message) {
	alert('Failed because: ' + message);
}






// C O M P A S S

// Start watching the compass
//
function startWatch() {
	
	// Update compass every 3 seconds
	var options = { frequency: 3000 };
	
	watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

// Stop watching the compass
//
function stopWatch() {
	if (watchID) {
		navigator.compass.clearWatch(watchID);
		watchID = null;
	}
}

// onSuccess: Get the current heading
//
function onSuccess(heading) {
	var element = document.getElementById('heading');
	element.innerHTML = 'Heading: ' + heading.magneticHeading;
}

// onError: Failed to get the heading
//
function onError(compassError) {
	alert('Compass error: ' + compassError.code);
}